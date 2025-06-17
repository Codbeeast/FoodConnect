// components/GoogleButton.tsx
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'
import { auth, provider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

type Props = {
  text?: string
  onClick?: () => void
}

const GoogleButton = ({ text = "Continue with Google" }: Props) => {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
    

      // Optional: Save to localStorage or state
      localStorage.setItem('user', JSON.stringify(user))

      // Navigate to dashboard/home
      navigate('/') // or wherever you want to go after login
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