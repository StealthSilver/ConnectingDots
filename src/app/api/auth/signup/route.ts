import { NextResponse } from "next/server"
import { z } from "zod"

import { createCredentialsUser } from "@/lib/users"

const signupSchema = z.object({
  username: z.string().trim().min(3).max(20),
  email: z.string().trim().email(),
  password: z.string().min(8),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide a valid username, email, and password." },
        { status: 400 },
      )
    }

    const result = await createCredentialsUser(parsed.data)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 409 })
    }

    return NextResponse.json({ user: result.user }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
