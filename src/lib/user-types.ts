import type { ObjectId } from "mongodb"

export type AuthProvider = "credentials" | "google"

export type UserDocument = {
  _id: ObjectId
  username: string
  email: string
  passwordHash?: string
  image?: string
  provider: AuthProvider
  createdAt: Date
  updatedAt: Date
}

export type PublicUser = {
  id: string
  username: string
  email: string
  image?: string
  provider: AuthProvider
}
