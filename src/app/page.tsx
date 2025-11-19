'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const features = [
    {
      title: "Simple Tutorials",
      description: "Easy-to-follow guides for popular social media apps",
      icon: "📚"
    },
    {
      title: "Voice Assistance",
      description: "Use voice commands to navigate and learn",
      icon: "🎤"
    },
    {
      title: "AI Chat Helper",
      description: "Get instant answers to your questions",
      icon: "🤖"
    },
    {
      title: "Safe Learning",
      description: "Learn in a secure, scam-free environment",
      icon: "🛡️"
    }
  ]

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      const isLoggedIn = localStorage.getItem('elderease_is_logged_in')
      setIsLoggedIn(isLoggedIn === 'true')
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartLearning = () => {
  if (isLoggedIn) {
    // User is logged in, redirect to tutorials dashboard
    router.push('/tutorials')
  } else {
    // User is not logged in, redirect to register
    router.push('/register')
  }
}

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto leading-tight">
          Social Media Made <span className="text-blue-600">Simple</span> for Seniors
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Learn to connect with family and friends through Facebook, WhatsApp, and more with our friendly, step-by-step guidance.
        </p>
        <div className="space-x-4">
          <button
            onClick={handleStartLearning}
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow-lg disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Start Learning Free'}
          </button>
          <a 
            href="/login" 
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition text-lg font-semibold shadow-lg"
          >
            Returning User
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose ElderEase?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How ElderEase Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-gray-600">Sign up with your email and create a secure password</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Set Up Your Profile</h3>
                <p className="text-gray-600">Add your photo and tell us what you want to learn</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl bg-yellow-100 text-yellow-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
                <p className="text-gray-600">Choose from our simple tutorials or ask our AI helper</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
