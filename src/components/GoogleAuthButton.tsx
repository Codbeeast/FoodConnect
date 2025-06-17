import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../lib/firebase'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

type Props = {
  text?: string
  onClick?: () => void
}

const GoogleButton: React.FC<Props> = ({ text = "Continue with Google" }) => {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')
      }
    } catch (error) {
      console.error("❌ Google popup login failed:", error)

      // Firebase popup may fail in Safari iOS, embedded webviews, etc.
      if (
        typeof window !== 'undefined' &&
        /crios|fxios|safari/i.test(window.navigator.userAgent) &&
        !window.navigator.standalone
      ) {
        alert("Google Sign-In might not work in this browser. Try opening in Chrome or Safari directly.")
      }
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
