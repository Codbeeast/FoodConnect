// components/GoogleButton.tsx
import { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { auth, provider } from '../lib/firebase'
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

type Props = {
  text?: string
}

const GoogleButton = ({ text = "Continue with Google" }: Props) => {
  const navigate = useNavigate()

  // Handle redirect result on mount (only runs after redirect on mobile)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
          navigate('/')
        }
      })
      .catch((error) => {
        console.error("❌ Google redirect login failed:", error)
      })
  }, [])

  const handleGoogleLogin = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider)
      } else {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      }
    } catch (error) {
      console.error("❌ Google login failed:", error)
    }
  }

  return (
    <motion.button
      onClick={handleGoogleLogin}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full py-2 bg-white text-black font-medium rounded-full flex items-center justify-center gap-3 shadow-lg transition-all duration-300 mt-4"
    >
      <FcGoogle size={22} />
      {text}
    </motion.button>
  )
}

export default GoogleButton
