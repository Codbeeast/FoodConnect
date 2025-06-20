import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
type Props = {
  text?: string
}

declare global {
  interface Window {
    google: any
  }
}

const GoogleButton: React.FC<Props> = ({ text = 'Continue with Google' }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.google && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleCredentialResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById('google-button-container'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'pill',
        }
      )
    }
  }, [])

  const handleCredentialResponse = async (response: any) => {
    const token = response.credential

    // ✅ Decode the JWT
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const user = JSON.parse(jsonPayload)

    // ✅ Save user locally
    localStorage.setItem('user', JSON.stringify(user))
    const loadingToast = toast.loading('Please wait...')
    // ✅ Send user to backend
    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      
      const res = await fetch(`${baseURL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          picture: user.picture,
        }),
      })
      const result = await res.json()
      const storedUser = JSON.parse(localStorage.getItem('user')!)
      storedUser.id = result?.user?._id
      localStorage.setItem('user', JSON.stringify(storedUser))
      toast.dismiss(loadingToast) 
     } catch (err) {
      
    }

    // ✅ Navigate
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
