import { redirect } from "next/navigation"

import { authRoutes } from "@/lib/auth-routes"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const params = await searchParams
  const query = new URLSearchParams({ mode: "sign-in" })

  if (params.callbackUrl) {
    query.set("callbackUrl", params.callbackUrl)
  }

  redirect(`${authRoutes.signUp}?${query.toString()}`)
}
