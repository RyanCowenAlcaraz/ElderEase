'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Tutorial {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  estimatedTime: number
  platform: string
  progress?: {
    completed: boolean
    currentStep: number
  }
  isBookmarked?: boolean
}

interface UserProgress {
  totalTutorials: number
  completedTutorials: number
  totalTimeSpent: number
  favoritePlatforms: string[]
}

export default function TutorialsDashboard() {
  const router = useRouter()
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalTutorials: 0,
    completedTutorials: 0,
    totalTimeSpent: 0,
    favoritePlatforms: []
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const categories = ['all', 'facebook', 'whatsapp', 'youtube', 'instagram', 'email', 'video-call', 'shopping', 'news', 'safety']
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']
  const platforms = ['all', 'facebook', 'whatsapp', 'youtube', 'instagram', 'gmail', 'zoom', 'amazon']

  useEffect(() => {
    loadTutorialsAndProgress()
  }, [])

  useEffect(() => {
    filterTutorials()
  }, [tutorials, searchTerm, selectedCategory, selectedDifficulty, selectedPlatform])

  const loadTutorialsAndProgress = async () => {
    try {
      const userId = localStorage.getItem('elderease_user_id')
      if (!userId) {
        router.push('/login')
        return
      }

      // For now, use mock data - we'll replace with actual API calls later
      const mockTutorials: Tutorial[] = [
        {
          id: '1',
          title: 'Getting Started with Facebook',
          description: 'Learn how to create an account, find friends, and make your first post',
          category: 'facebook',
          difficulty: 'beginner',
          estimatedTime: 15,
          platform: 'facebook',
          progress: { completed: true, currentStep: 10 },
          isBookmarked: true
        },
        {
          id: '2',
          title: 'Sending Messages on WhatsApp',
          description: 'Learn to send text messages, photos, and make voice calls',
          category: 'whatsapp',
          difficulty: 'beginner',
          estimatedTime: 10,
          platform: 'whatsapp',
          progress: { completed: false, currentStep: 3 },
          isBookmarked: false
        },
        {
          id: '3',
          title: 'Watching Videos on YouTube',
          description: 'Discover how to search for videos, create playlists, and subscribe to channels',
          category: 'youtube',
          difficulty: 'beginner',
          estimatedTime: 12,
          platform: 'youtube',
          progress: { completed: false, currentStep: 0 },
          isBookmarked: true
        },
        {
          id: '4',
          title: 'Sharing Photos on Instagram',
          description: 'Learn to post photos, add filters, and share with friends',
          category: 'instagram',
          difficulty: 'intermediate',
          estimatedTime: 8,
          platform: 'instagram',
          progress: { completed: false, currentStep: 0 },
          isBookmarked: false
        },
        {
          id: '5',
          title: 'Writing and Sending Emails',
          description: 'Master email basics: composing, sending, and organizing your inbox',
          category: 'email',
          difficulty: 'beginner',
          estimatedTime: 20,
          platform: 'gmail',
          progress: { completed: true, currentStep: 10 },
          isBookmarked: false
        },
        {
          id: '6',
          title: 'Video Calls with Family',
          description: 'Learn to make video calls on WhatsApp, Zoom, and Facebook',
          category: 'video-call',
          difficulty: 'intermediate',
          estimatedTime: 15,
          platform: 'zoom',
          progress: { completed: false, currentStep: 2 },
          isBookmarked: true
        }
      ]

      const mockProgress: UserProgress = {
        totalTutorials: mockTutorials.length,
        completedTutorials: mockTutorials.filter(t => t.progress?.completed).length,
        totalTimeSpent: 45,
        favoritePlatforms: ['facebook', 'whatsapp']
      }

      setTutorials(mockTutorials)
      setUserProgress(mockProgress)
      
      // TODO: Replace with actual API calls later
      // const tutorialsResponse = await fetch('/api/tutorials')
      // const tutorialsData = await tutorialsResponse.json()
      // const progressResponse = await fetch(`/api/progress?userId=${userId}`)
      // const progressData = await progressResponse.json()
      // const bookmarksResponse = await fetch(`/api/bookmarks?userId=${userId}`)
      // const bookmarksData = await bookmarksResponse.json()

    } catch (error) {
      console.error('Error loading tutorials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTutorials = () => {
    let filtered = tutorials

    if (searchTerm) {
      filtered = filtered.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === selectedDifficulty)
    }

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.platform === selectedPlatform)
    }

    setFilteredTutorials(filtered)
  }

  const handleTutorialClick = (tutorialId: string) => {
    router.push(`/tutorials/${tutorialId}`)
  }

  const toggleBookmark = async (tutorialId: string, currentlyBookmarked: boolean) => {
    try {
      const userId = localStorage.getItem('elderease_user_id')
      if (!userId) return

      // TODO: Replace with actual API call later
      console.log('Toggling bookmark for tutorial:', tutorialId)
      
      // Update local state immediately for better UX
      setTutorials(prev => prev.map(tutorial => 
        tutorial.id === tutorialId 
          ? { ...tutorial, isBookmarked: !currentlyBookmarked }
          : tutorial
      ))

      // Simulate API call
      // const response = await fetch('/api/bookmarks', {
      //   method: currentlyBookmarked ? 'DELETE' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, tutorialId }),
      // })

    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  const progressPercentage = userProgress.totalTutorials > 0 
    ? Math.round((userProgress.completedTutorials / userProgress.totalTutorials) * 100)
    : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Learn Social Media</h1>
          <button
            onClick={() => router.push('/profile')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            My Profile
          </button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    stroke="#3b82f6" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (progressPercentage / 100) * 251.2}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {progressPercentage}%
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {userProgress.completedTutorials}/{userProgress.totalTutorials}
                </p>
                <p className="text-gray-600 text-sm">Tutorials Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Time Spent</h3>
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(userProgress.totalTimeSpent / 60)}min
            </p>
            <p className="text-gray-600 text-sm">Learning</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
            <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
            <p className="text-gray-600 text-sm">Available</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Bookmarks</h3>
            <p className="text-2xl font-bold text-gray-800">
              {tutorials.filter(t => t.isBookmarked).length}
            </p>
            <p className="text-gray-600 text-sm">Saved</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
              onClick={() => handleTutorialClick(tutorial.id)}
            >
              {/* Tutorial Header */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      {tutorial.platform}
                    </span>
                    <span className="inline-block ml-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(tutorial.id, tutorial.isBookmarked || false)
                    }}
                    className={`text-xl transition ${
                      tutorial.isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    {tutorial.isBookmarked ? '★' : '☆'}
                  </button>
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 text-sm">{tutorial.description}</p>
              </div>

              {/* Tutorial Footer */}
              <div className="p-4">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>{tutorial.estimatedTime} min</span>
                  <span>{tutorial.category}</span>
                </div>
                
                {/* Progress Bar */}
                {tutorial.progress && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{
                        width: tutorial.progress.completed 
                          ? '100%' 
                          : `${(tutorial.progress.currentStep / 10) * 100}%`
                      }}
                    ></div>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-sm">
                  <span className={tutorial.progress?.completed ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {tutorial.progress?.completed ? 'Completed' : tutorial.progress ? 'In Progress' : 'Not Started'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    Start Learning →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tutorials found matching your filters.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedDifficulty('all')
                setSelectedPlatform('all')
              }}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}