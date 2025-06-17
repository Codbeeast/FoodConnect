import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, signInWithRedirect, getRedirectResult, UserCredential } from 'firebase/auth'
import { auth, provider } from '../lib/firebase'
import { FcGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

type Props = {
  text?: string
  onClick?:()=>void
}

const GoogleButton: React.FC<Props> = ({ text = "Continue with Google" }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result: UserCredential | null = await getRedirectResult(auth)
        if (result?.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
          navigate('/')
        }
      } catch (error) {
        console.error("🚫 Redirect login failed:", error)
      }
    }

    checkRedirectResult()
  }, [navigate])

  const handleGoogleLogin = async () => {
    const isMobile = window.innerWidth < 768

    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider)
      } else {
        const result = await signInWithPopup(auth, provider)
        localStorage.setItem('user', JSON.stringify(result.user))
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
