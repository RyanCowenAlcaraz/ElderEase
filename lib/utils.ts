// lib/auth.ts
export interface User {
  id: string
  name: string
  email: string
  phone: string
  birthYear: string
  profilePhoto?: string
  createdAt: string
}

export const authUtils = {
  isLoggedIn: (): boolean => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('elderease_is_logged_in') === 'true'
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    try {
      const user = localStorage.getItem('elderease_current_user')
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  logout: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('elderease_is_logged_in')
    localStorage.removeItem('elderease_current_user')
    window.location.href = '/'
  },

  login: (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('elderease_users') || '[]')
        const user = users.find((u: User) => u.email === email)
        
        if (user && user.password === password) {
          localStorage.setItem('elderease_is_logged_in', 'true')
          localStorage.setItem('elderease_current_user', JSON.stringify(user))
          resolve({ success: true })
        } else {
          resolve({ success: false, error: 'Invalid email or password' })
        }
      }, 1000)
    })
  }
}