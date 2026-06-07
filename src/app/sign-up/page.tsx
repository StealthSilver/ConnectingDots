import { redirect } from "next/navigation"
import { Suspense } from "react"

import { auth } from "@/auth"
import { Navbar } from "@/app/components/section/navbar"
import { Footer } from "@/app/components/section/site-footer"
import { pageContentShellClassName } from "@/lib/page-content-shell"
import { appRoutes } from "@/lib/app-routes"
import { cn } from "@/lib/utils"

import { AuthForm } from "./auth-form"

export default async function SignUpPage() {
  const session = await auth()

  if (session?.user) {
    redirect(appRoutes.home)
  }

  return (
    <>
      <Navbar />
      <main className="w-full min-w-0 flex-1">
        <section className="w-full py-10 sm:py-20">
          <div className={cn(pageContentShellClassName, "flex justify-center")}>
            <Suspense fallback={null}>
              <AuthForm
                googleEnabled={Boolean(
                  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
                )}
              />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
