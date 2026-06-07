"use client"

import { IconBrandGoogle } from "@tabler/icons-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { GlowCard } from "@/components/glow-card-grid"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { appRoutes } from "@/lib/app-routes"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

const inputClass = cn(
  "w-full rounded-xl border border-[color:var(--color-line)] bg-background/80 px-4 py-2.5 text-sm text-foreground",
  "placeholder:text-muted-foreground/70",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
)

type AuthMode = "sign-up" | "sign-in"

export function AuthForm({ googleEnabled = false }: { googleEnabled?: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") ?? appRoutes.home

  const [mode, setMode] = useState<AuthMode>("sign-up")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleCredentialsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === "sign-up") {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        })

        const data = (await response.json()) as { error?: string }

        if (!response.ok) {
          setError(data.error ?? "Could not create your account.")
          return
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(
          mode === "sign-up"
            ? "Account created, but sign-in failed. Try signing in."
            : "Invalid email or password.",
        )
        return
      }

      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(null)
    setGoogleLoading(true)

    try {
      await signIn("google", { callbackUrl })
    } catch {
      setError("Google sign-in failed. Please try again.")
      setGoogleLoading(false)
    }
  }

  return (
    <GlowCard className="mx-auto w-full max-w-md">
      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="mb-8 text-center">
          <h1
            className={cn(
              navChakra,
              "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
            )}
          >
            {mode === "sign-up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {mode === "sign-up"
              ? "Join Connecting Dots to access blogs, courses, and more."
              : "Sign in to continue to your workspace."}
          </p>
        </div>

        <div
          className={cn(
            "mb-6 grid grid-cols-2 gap-1 rounded-full border border-[color:var(--color-line)] bg-background/60 p-1",
            navChakra,
          )}
        >
          {(["sign-up", "sign-in"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setMode(tab)
                setError(null)
              }}
              className={cn(
                "rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm",
                mode === tab
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab === "sign-up" ? "Sign up" : "Sign in"}
            </button>
          ))}
        </div>

        {googleEnabled && (
          <>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className={cn(
                "mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-line)]",
                "bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200",
                "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]",
                "disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              <IconBrandGoogle className="size-4" aria-hidden />
              {googleLoading ? "Redirecting…" : "Continue with Google"}
            </button>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[color:var(--color-line)]" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-[color:var(--color-line)]" />
            </div>
          </>
        )}

        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          {mode === "sign-up" && (
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-medium text-muted-foreground">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={20}
                pattern="[a-zA-Z0-9_]{3,20}"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={inputClass}
                placeholder="your_handle"
              />
              <p className="text-xs text-muted-foreground">
                3–20 characters. Letters, numbers, and underscores only.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="At least 8 characters"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          )}

          <HoverBorderGradient
            as="button"
            type="submit"
            disabled={loading || googleLoading}
            containerClassName="w-full"
            className={cn(
              navChakra,
              "flex w-full justify-center text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {loading
              ? mode === "sign-up"
                ? "Creating account…"
                : "Signing in…"
              : mode === "sign-up"
                ? "Create account"
                : "Sign in"}
          </HoverBorderGradient>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="underline-offset-4 hover:text-foreground hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </GlowCard>
  )
}
