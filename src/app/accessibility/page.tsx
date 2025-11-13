'use client'

import { useState, useEffect } from 'react'

export default function Accessibility() {
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    voiceEnabled: false
  })

  useEffect(() => {
    const saved = localStorage.getItem('elderease_preferences')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('elderease_preferences', JSON.stringify(settings))
    alert('Settings saved!')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-700 text-white p-6">
            <h1 className="text-3xl font-bold">Accessibility Settings</h1>
            <p className="text-blue-100 mt-2">Customize your experience</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Text Size */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-lg font-medium text-gray-800 mb-2 block">
                Text Size
              </label>
              <select
                value={settings.fontSize}
                onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">Extra Large</option>
              </select>
            </div>

            {/* Contrast */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="text-lg font-medium text-gray-800 mb-2 block">
                Color Contrast
              </label>
              <select
                value={settings.contrast}
                onChange={(e) => setSettings({...settings, contrast: e.target.value})}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              >
                <option value="normal">Normal</option>
                <option value="high">High Contrast</option>
                <option value="blue">Blue Light Filter</option>
              </select>
            </div>

            {/* Voice Commands */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-lg font-medium text-gray-800 block">
                    Voice Commands
                  </label>
                  <p className="text-gray-600 text-sm">Enable voice input and navigation</p>
                </div>
                <button
                  onClick={() => setSettings({...settings, voiceEnabled: !settings.voiceEnabled})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.voiceEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transform transition-transform ${
                      settings.voiceEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}