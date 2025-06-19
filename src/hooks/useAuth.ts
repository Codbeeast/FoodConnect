// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

declare global {
  interface Window {
    google: any
  }
}

export type GoogleUser = {
  name: string
  email: string
  picture?: string
}

type DecodedToken = {
  exp: number
  [key: string]: any
}

export const useAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [loading] = useState(true)
  const [isExpired, setIsExpired] = useState(false)

 useEffect(() => {
  const checkLogin = () => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        const now = Date.now()

        if (decoded.exp * 1000 < now) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('token_expiry')
          window.location.reload()
          setUser(null)
          setIsExpired(true)
          return
        }
      } catch (err) {
        console.error('Failed to decode token:', err)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)

        if (parsed.user && parsed.user.name && parsed.user.email) {
          setUser(parsed.user)
        } else if (parsed.name && parsed.email) {
          setUser(parsed)
        }
      } catch (err) {
        console.error('Failed to parse user:', err)
      }
    }
  }

  // Run on mount
  checkLogin()

  // ✅ Re-check every 10 seconds
  const interval = setInterval(checkLogin, 10000)

  return () => clearInterval(interval)
}, [])


  const isAuthenticated = !!user && !isExpired

  const getInitials = () => {
    if (!user?.name) return ''
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return { user, isAuthenticated, initials: getInitials(), loading, isExpired }
}
