import { hash } from "bcryptjs"
import { ObjectId } from "mongodb"

import clientPromise, { MONGODB_DB_NAME } from "@/lib/mongodb"
import type { AuthProvider, PublicUser, UserDocument } from "@/lib/user-types"

export const USERS_COLLECTION = "users"

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/

export function isValidUsername(username: string) {
  return USERNAME_REGEX.test(username)
}

function toPublicUser(doc: UserDocument): PublicUser {
  return {
    id: doc._id.toString(),
    username: doc.username,
    email: doc.email,
    image: doc.image,
    provider: doc.provider,
  }
}

async function getUsersCollection() {
  const client = await clientPromise
  const db = client.db(MONGODB_DB_NAME)
  const collection = db.collection<UserDocument>(USERS_COLLECTION)

  await collection.createIndex({ email: 1 }, { unique: true })
  await collection.createIndex({ username: 1 }, { unique: true })

  return collection
}

export async function getUserByEmail(email: string) {
  const collection = await getUsersCollection()
  return collection.findOne({ email: email.toLowerCase() })
}

export async function getUserByUsername(username: string) {
  const collection = await getUsersCollection()
  return collection.findOne({ username })
}

export async function getUserById(id: string) {
  if (!ObjectId.isValid(id)) return null
  const collection = await getUsersCollection()
  return collection.findOne({ _id: new ObjectId(id) })
}

async function generateUniqueUsername(base: string) {
  const collection = await getUsersCollection()
  const sanitized = base.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15) || "user"

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? "" : `_${attempt}`
    const candidate = `${sanitized}${suffix}`.slice(0, 20)
    if (!isValidUsername(candidate)) continue
    const existing = await collection.findOne({ username: candidate })
    if (!existing) return candidate
  }

  const fallback = `user_${Date.now().toString(36).slice(-8)}`
  return fallback.slice(0, 20)
}

export async function createCredentialsUser({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}): Promise<{ user?: PublicUser; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase()
  const normalizedUsername = username.trim()

  if (!isValidUsername(normalizedUsername)) {
    return {
      error:
        "Username must be 3–20 characters and use only letters, numbers, or underscores.",
    }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }

  const collection = await getUsersCollection()

  const [emailTaken, usernameTaken] = await Promise.all([
    collection.findOne({ email: normalizedEmail }),
    collection.findOne({ username: normalizedUsername }),
  ])

  if (emailTaken) return { error: "An account with this email already exists." }
  if (usernameTaken) return { error: "This username is already taken." }

  const now = new Date()
  const passwordHash = await hash(password, 12)

  const result = await collection.insertOne({
    _id: new ObjectId(),
    username: normalizedUsername,
    email: normalizedEmail,
    passwordHash,
    provider: "credentials",
    createdAt: now,
    updatedAt: now,
  })

  const created = await collection.findOne({ _id: result.insertedId })
  if (!created) return { error: "Failed to create account. Please try again." }

  return { user: toPublicUser(created) }
}

export async function ensureGoogleUser({
  email,
  name,
  image,
}: {
  email: string
  name?: string | null
  image?: string | null
}) {
  const normalizedEmail = email.trim().toLowerCase()
  const collection = await getUsersCollection()
  const existing = await collection.findOne({ email: normalizedEmail })

  if (existing) {
    const updates: Partial<UserDocument> = { updatedAt: new Date() }
    if (image && existing.image !== image) updates.image = image
    if (Object.keys(updates).length > 1) {
      await collection.updateOne({ _id: existing._id }, { $set: updates })
    }
    return toPublicUser({ ...existing, ...updates })
  }

  const baseUsername = (name ?? normalizedEmail.split("@")[0] ?? "user").toLowerCase()
  const username = await generateUniqueUsername(baseUsername)
  const now = new Date()

  const result = await collection.insertOne({
    _id: new ObjectId(),
    username,
    email: normalizedEmail,
    image: image ?? undefined,
    provider: "google" as AuthProvider,
    createdAt: now,
    updatedAt: now,
  })

  const created = await collection.findOne({ _id: result.insertedId })
  if (!created) throw new Error("Failed to create Google user.")

  return toPublicUser(created)
}
