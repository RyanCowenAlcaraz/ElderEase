'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingChatbot from '../../components/FloatingChatbot'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

// Remove metadata export since we're using client component
// export const metadata: Metadata = {
//   title: 'ElderEase - Social Media Made Simple for Seniors',
//   description: 'Helping seniors connect confidently through simple social media tutorials and AI assistance',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuthStatus()
  }, [pathname]) // Re-check when route changes

  // Add this inside your RootLayout component in layout.tsx, after the existing useEffect:

useEffect(() => {
  const handleStorageChange = () => {
    checkAuthStatus() // Re-check auth status when storage changes
  }

  window.addEventListener('storage', handleStorageChange)
  
  return () => {
    window.removeEventListener('storage', handleStorageChange)
  }
}, []) // Add this dependency array
  const checkAuthStatus = () => {
    try {
      const userData = localStorage.getItem('elderease_user')
      const isLoggedIn = localStorage.getItem('elderease_is_logged_in')
      
      if (isLoggedIn === 'true' && userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('elderease_user')
    localStorage.removeItem('elderease_user_id')
    localStorage.removeItem('elderease_is_logged_in')
    setUser(null)
    router.push('/login')
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }

  return (
    <html lang="en">
      <head>
        <title>ElderEase - Social Media Made Simple for Seniors</title>
        <meta name="description" content="Helping seniors connect confidently through simple social media tutorials and AI assistance" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        {/* Dynamic Navigation */}
        <nav className="bg-blue-700 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">EE</span>
              </div>
              <h1 className="text-2xl font-bold">ElderEase</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a href="/" className="hover:underline text-lg">Home</a>
              <a href="/onboarding" className="hover:underline text-lg">Get Started</a>
              <a href="/accessibility" className="hover:underline text-lg">Settings</a>

              {/* User Section - Dynamic */}
              {isLoading ? (
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 hover:bg-blue-600 p-2 rounded-lg transition">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        {user.profilePhoto ? (
                          <img 
                            src={user.profilePhoto} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-blue-700 font-bold text-sm">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        )}
                      </div>
                      <span className="hidden md:inline">Hi, {user.name?.split(' ')[0] || 'User'}</span>
                      <svg 
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm text-gray-800 font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition flex items-center space-x-2"
                      >
                        <span>👤</span>
                        <span>My Profile</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-red-600 transition flex items-center space-x-2"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <a 
                  href="/login" 
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Floating AI Chatbot */}
        <FloatingChatbot />
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-lg">ElderEase - Bridging the Digital Divide for Seniors</p>
            <p className="text-gray-400 mt-2">Simple, Safe, and Empowering Social Media Learning</p>
          </div>
        </footer>
      </body>
    </html>
  )
}