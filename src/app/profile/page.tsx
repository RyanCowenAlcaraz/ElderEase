'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  profilePhoto?: string
}

export default function Profile() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    name: '',
    email: '',
    phone: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const userData = localStorage.getItem('elderease_user')
      const userId = localStorage.getItem('elderease_user_id')
      
      if (userData) {
        setProfile(JSON.parse(userData))
      } else if (userId) {
        // Fetch from API if not in localStorage
        const response = await fetch(`/api/profile?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setProfile(data.user)
          localStorage.setItem('elderease_user', JSON.stringify(data.user))
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error)
      setMessage('Error loading profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

const handleSaveProfile = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  
  try {
    const userId = localStorage.getItem('elderease_user_id')
    if (!userId) {
      setMessage('User not found. Please login again.')
      return
    }

    console.log('Saving profile with data:', {
      userId,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      profilePhoto: profile.profilePhoto ? 'Base64 data present' : 'No photo'
    })

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        profilePhoto: profile.profilePhoto
      }),
    })

    const data = await response.json()
    console.log('API Response:', data)

    if (response.ok) {
      localStorage.setItem('elderease_user', JSON.stringify(data.user))
      setMessage('Profile updated successfully!')
      setIsEditing(false)
    } else {
      setMessage(data.error || 'Error updating profile')
    }
  } catch (error) {
    console.error('Save profile error:', error)
    setMessage('Error updating profile')
  } finally {
    setIsLoading(false)
    setTimeout(() => setMessage(''), 3000)
  }
}

  // ENHANCED: Auto-save profile photo to database immediately
  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage('Image too large. Please choose a file smaller than 2MB.')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file.')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setIsUploadingPhoto(true)

    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string
        
        // Update local state immediately for better UX
        setProfile({
          ...profile,
          profilePhoto: base64Image
        })

        // Auto-save to database
        const userId = localStorage.getItem('elderease_user_id')
        if (!userId) {
          setMessage('User not found. Please login again.')
          return
        }

        const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            profilePhoto: base64Image,
            // Keep existing data
            name: profile.name,
            email: profile.email,
            phone: profile.phone
          }),
        })

        const data = await response.json()

        if (response.ok) {
          // Update localStorage with new user data
          localStorage.setItem('elderease_user', JSON.stringify(data.user))
          setMessage('Profile photo updated successfully!')
          
          // Force header refresh by triggering storage event
          window.dispatchEvent(new Event('storage'))
        } else {
          setMessage(data.error || 'Error updating profile photo')
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setMessage('Error uploading photo')
    } finally {
      setIsUploadingPhoto(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match')
      return
    }
    
    // TODO: Implement password change API
    setMessage('Password change feature coming soon!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('elderease_user')
    localStorage.removeItem('elderease_user_id')
    localStorage.removeItem('elderease_is_logged_in')
    router.push('/login')
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {/* Header with Back Button and Logout */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded mb-4 ${
          message.includes('Error') || message.includes('failed') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Profile Photo */}
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          {profile.profilePhoto ? (
            <img 
              src={profile.profilePhoto} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-4xl">👤</span>
          )}
        </div>
        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handleProfilePhotoUpload}
          className="hidden"
          disabled={isUploadingPhoto}
        />
        <label
          htmlFor="profilePhoto"
          className={`inline-block mt-4 px-4 py-2 rounded transition cursor-pointer ${
            isUploadingPhoto 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
        </label>
        <p className="text-sm text-gray-500 mt-2">Max 2MB - JPG, PNG, GIF</p>
      </div>

      {/* Rest of your profile form remains the same */}
      <form onSubmit={handleSaveProfile} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleProfileChange}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div className="flex space-x-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  loadUserProfile() // Reload original data
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>

      {/* Change Password Section - unchanged */}
      <div className="mt-8 pt-6 border-t">
        <button
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
        </button>

        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}