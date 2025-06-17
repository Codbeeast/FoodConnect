// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const isAuthenticated = !!user

  const getInitials = () => {
    if (!user?.displayName) return ''
    const parts = user.displayName.trim().split(' ')
    return parts.map((p: string) => p[0].toUpperCase()).join('')
  }

  return { user, isAuthenticated, initials: getInitials(), loading }
}
