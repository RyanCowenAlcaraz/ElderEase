'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userPreferences, setUserPreferences] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    voiceEnabled: false,
    tutorialSpeed: 'normal'
  })
  const router = useRouter()

  const steps = [
    {
      title: "Welcome to ElderEase!",
      description: "Let's set up your learning experience to make it comfortable and easy for you.",
      icon: "👋"
    },
    {
      title: "Text Size Preference",
      description: "Choose the text size that's most comfortable for your reading.",
      icon: "🔠"
    },
    {
      title: "Screen Contrast",
      description: "Select the contrast level that works best for your eyes.",
      icon: "🎨"
    },
    {
      title: "Voice Assistance",
      description: "Would you like to use voice commands to navigate?",
      icon: "🎤"
    },
    {
      title: "Learning Speed",
      description: "How fast would you like the tutorials to proceed?",
      icon: "⚡"
    },
    {
      title: "All Set!",
      description: "Your ElderEase experience is now customized just for you!",
      icon: "🎉"
    }
  ]

  const handlePreferenceChange = (key: string, value: any) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save preferences and redirect
      localStorage.setItem('elderease_preferences', JSON.stringify(userPreferences))
      localStorage.setItem('elderease_onboarding_complete', 'true')
      router.push('/')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'small', label: 'Small', size: 'text-lg' },
                { value: 'medium', label: 'Medium', size: 'text-xl' },
                { value: 'large', label: 'Large', size: 'text-2xl' },
                { value: 'xlarge', label: 'Extra Large', size: 'text-3xl' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePreferenceChange('fontSize', option.value)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    userPreferences.fontSize === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <span className={`${option.size} font-semibold`}>A</span>
                  <div className="mt-2 font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'normal', label: 'Normal', bg: 'bg-white', text: 'text-gray-900' },
                { value: 'high', label: 'High Contrast', bg: 'bg-black', text: 'text-yellow-300' },
                { value: 'blue', label: 'Blue Light', bg: 'bg-blue-50', text: 'text-blue-900' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePreferenceChange('contrast', option.value)}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    userPreferences.contrast === option.value
                      ? 'border-blue-500 ring-2 ring-blue-300'
                      : 'border-gray-300 hover:border-blue-300'
                  } ${option.bg} ${option.text}`}
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                  <div className="text-sm mt-2">Sample text preview</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handlePreferenceChange('voiceEnabled', true)}
                className={`p-6 border-2 rounded-lg text-center transition-all ${
                  userPreferences.voiceEnabled
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <div className="text-3xl mb-2">🎤</div>
                <div className="font-semibold">Yes, Enable Voice</div>
                <div className="text-sm text-gray-600 mt-2">Use voice commands</div>
              </button>
              <button
                onClick={() => handlePreferenceChange('voiceEnabled', false)}
                className={`p-6 border-2 rounded-lg text-center transition-all ${
                  !userPreferences.voiceEnabled
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="text-3xl mb-2">🔇</div>
                <div className="font-semibold">No, Text Only</div>
                <div className="text-sm text-gray-600 mt-2">Use buttons and text</div>
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'slow', label: 'Slow & Detailed', description: 'More explanations, step by step' },
                { value: 'normal', label: 'Normal Pace', description: 'Balanced speed and detail' },
                { value: 'fast', label: 'Quick Overview', description: 'For experienced users' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePreferenceChange('tutorialSpeed', option.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    userPreferences.tutorialSpeed === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <p className="text-xl text-gray-700 leading-relaxed">
              {steps[currentStep].description}
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div 
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          {/* Step Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {steps[currentStep].title}
            </h1>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8 min-h-[200px] flex items-center justify-center">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              {currentStep === steps.length - 1 ? 'Get Started!' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}