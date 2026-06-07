import { compare } from "bcryptjs"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { z } from "zod"

import { authConfig } from "@/auth.config"
import { ensureGoogleUser, getUserByEmail } from "@/lib/users"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const email = parsed.data.email.trim().toLowerCase()
        const user = await getUserByEmail(email)
        if (!user?.passwordHash) return null

        const valid = await compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const dbUser = await ensureGoogleUser({
          email: user.email,
          name: user.name,
          image: user.image,
        })
        user.id = dbUser.id
        user.name = dbUser.username
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.id = user.id
        token.username = user.name ?? undefined
      }

      if (account?.provider === "google" && user?.email) {
        const dbUser = await getUserByEmail(user.email)
        if (dbUser) {
          token.id = dbUser._id.toString()
          token.username = dbUser.username
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? ""
        session.user.name = token.username ?? session.user.name
      }
      return session
    },
  },
})
