export const authRoutes = {
  signUp: "/sign-up",
  home: "/home",
} as const

export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60

export function isProtectedPath(pathname: string) {
  return (
    pathname === authRoutes.home ||
    pathname.startsWith(`${authRoutes.home}/`)
  )
}
