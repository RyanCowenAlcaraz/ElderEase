'use client'

import { useState } from 'react'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthYear: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentYear = new Date().getFullYear()
  const birthYears = Array.from({ length: 80 }, (_, i) => currentYear - i - 10)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please create a password'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.birthYear) {
      newErrors.birthYear = 'Please select your birth year'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

// In the handleSubmit function, replace the localStorage code with:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (validateForm()) {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data in localStorage for client-side access
        localStorage.setItem('elderease_user', JSON.stringify(data.user))
        localStorage.setItem('elderease_user_id', data.user.id)
        localStorage.setItem('elderease_is_logged_in', 'true')
        
        setIsSuccess(true)
      } else {
        setErrors({ email: data.error || 'Registration failed' })
      }
    } catch (error) {
      setErrors({ email: 'Network error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

// Replace the success section in register/page.tsx
if (isSuccess) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold text-green-800 mb-4">Welcome to ElderEase!</h2>
        <p className="text-lg text-gray-700 mb-6">
          Your account has been created successfully. Let's customize your experience!
        </p>
        <div className="space-y-3">
          <a 
            href="/onboarding" 
            className="block w-full bg-green-600 text-white text-lg py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Customize Settings
          </a>
          <a 
            href="/" 
            className="block w-full bg-blue-600 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Skip to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Join ElderEase</h2>
          <p className="text-blue-100 mt-2">Create your free account to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
              }`}
            />
            {errors.name && <p className="mt-2 text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
              }`}
            />
            {errors.email && <p className="mt-2 text-red-600 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="birthYear" className="block text-lg font-medium text-gray-700 mb-2">
              Year of Birth *
            </label>
            <select
              id="birthYear"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.birthYear ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
              }`}
            >
              <option value="">Select your birth year</option>
              {birthYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.birthYear && <p className="mt-2 text-red-600 text-sm">{errors.birthYear}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Create Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
              }`}
            />
            {errors.password && <p className="mt-2 text-red-600 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500'
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-red-600 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white text-lg py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition font-semibold shadow-lg"
          >
            {isLoading ? 'Creating Account...' : 'Create My Account'}
          </button>
        </form>

        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-semibold text-lg">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}