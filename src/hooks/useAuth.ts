// hooks/useAuth.ts
export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null') // Replace with real auth logic

  const isAuthenticated = !!user

  const getInitials = () => {
    if (!user?.displayName) return ''
    const parts = user.displayName?.trim().split(' ')
    return parts.map((p: string) => p[0].toUpperCase()).join('')
  }

  return { user, isAuthenticated, initials: getInitials() }
}
