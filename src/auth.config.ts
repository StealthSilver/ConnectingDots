import type { NextAuthConfig } from "next-auth"

import {
  authRoutes,
  isProtectedPath,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth-routes"

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: authRoutes.signUp,
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  providers: [],
  callbacks: {
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl
      if (!isProtectedPath(pathname)) return true
      return !!session?.user
    },
  },
} satisfies NextAuthConfig
