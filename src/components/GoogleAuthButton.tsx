import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'

type Props = {
  text?: string
}
declare global {
  interface Window {
    google: any
  }
}

const GoogleButton: React.FC<Props> = ({ text }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID, // Replace with your actual client ID
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById('google-button-container')!,
        { theme: 'outline', size: 'large', width: '100%' }
      )
    }
  }, [])

  const handleCredentialResponse = (response: any) => {
    const token = response.credential

    // Decode JWT to get user info (for demo purpose only, use backend to verify token in production)
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
  className="mt-4 w-full gap-2 flex justify-center items-center px-2 bg-black h-10 rounded-4xl py-6"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  aria-label={text}
    >
      {/* Google renders its button inside this div */}
      <FcGoogle size={22} />
       {text || 'Continue with Google'}
    </motion.div>
  )
}

export default GoogleButton
{/* <motion.div
  id="google-button-container"
  className="mt-4 w-full flex justify-center items-center px-2"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  aria-label={text}
/> */}
