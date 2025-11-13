import { NextRequest, NextResponse } from 'next/server'
import { updateUserPreferences } from '@/lib/auth-utils'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, preferences } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const userPreferences = await updateUserPreferences(userId, preferences)

    return NextResponse.json(
      { 
        message: 'Preferences updated successfully',
        preferences: userPreferences 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update preferences error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}