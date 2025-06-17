import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type Props = {
  text?: string // Note: Google renders its own text inside the button
}

declare global {
  interface Window {
    google: any
  }
}

const GoogleButton: React.FC<Props> = ({ text = "Continue with Google" }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID, // Add this in your .env file
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById('google-button-container'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with', // "signin_with", "signup_with", etc.
          shape: 'pill'
        }
      )
    }
  }, [])

  const handleCredentialResponse = (response: any) => {
    const token = response.credential

    // Decode the JWT (for demo only, in prod verify on server)
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const user = JSON.parse(jsonPayload)
    console.log("👤 Google user:", user)

    localStorage.setItem('user', JSON.stringify(user))
    navigate('/')
  }

  return (
    <motion.div
      id="google-button-container"
      className="w-full mt-4 flex justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={text}
    />
  )
}

export default GoogleButton
