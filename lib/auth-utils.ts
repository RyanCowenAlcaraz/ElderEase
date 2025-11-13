// lib/auth-utils.ts
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export interface UserData {
  email: string
  name: string
  password: string
  phone?: string
  birthYear?: string
}

export interface LoginData {
  email: string
  password: string
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function createUser(userData: UserData) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (existingUser) {
      throw new AuthError('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        phone: userData.phone,
        birthYear: userData.birthYear
      }
    })

    // Create user preferences
    await prisma.userPreference.create({
      data: {
        userId: user.id,
        preferences: {
          fontSize: 'medium',
          contrast: 'normal',
          voiceEnabled: false,
          tutorialSpeed: 'normal',
          reducedMotion: false,
          simpleLayout: false
        }
      }
    })

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    throw error
  }
}

export async function verifyUser(loginData: LoginData) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email }
    })

    if (!user) {
      throw new AuthError('Invalid email or password')
    }

    const isValidPassword = await bcrypt.compare(loginData.password, user.password)

    if (!isValidPassword) {
      throw new AuthError('Invalid email or password')
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    throw error
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true
      }
    })

    if (!user) {
      throw new AuthError('User not found')
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    throw error
  }
}

export async function updateUserProfile(userId: string, updateData: {
  name?: string
  email?: string
  phone?: string
  profilePhoto?: string
}) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    throw error
  }
}

export async function updateUserPreferences(userId: string, preferences: any) {
  try {
    const userPreference = await prisma.userPreference.upsert({
      where: { userId },
      update: { preferences },
      create: {
        userId,
        preferences
      }
    })

    return userPreference
  } catch (error) {
    throw error
  }
}