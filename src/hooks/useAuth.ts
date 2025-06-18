// hooks/useAuth.ts
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    google: any
  }
}
export {} // Required to make this a module and avoid scope issues

type GoogleUser = {
  name: string
  email: string
  picture: string
}

export const useAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const checkLogin = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)

        // Case: { user: { name, email, ... } }
        if (parsed.user && parsed.user.name && parsed.user.email) {
          setUser(parsed.user)
        }
        // Case: { name, email, ... }
        else if (parsed.name && parsed.email) {
          setUser(parsed)
        }

      } catch (err) {
        console.error('Failed to parse user:', err)
      }
    }
    setLoading(false)
  }

  checkLogin()
}, [])


  const isAuthenticated = !!user
 console.log(user?.name)
  const getInitials = () => {
    if (!user?.name) return ''
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return { user, isAuthenticated, initials: getInitials(), loading }
}
