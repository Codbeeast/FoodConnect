// pages/Login.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleButton from './GoogleAuthButton'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post(`${baseURL}/api/login`, { email, password })

      // Decode the token to get expiration
      const decoded: any = jwtDecode(data.token)
      const expiry = decoded.exp * 1000 // convert to ms

      // Store in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('token_expiry', expiry.toString())
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Logged in successfully!')
      setTimeout(() => navigate('/'), 1000)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <h1 className="text-4xl font-extrabold text-[#22D3EE] text-center mb-2">FoodConnect</h1>
        <p className="text-md text-center text-gray-300 mb-8 italic">
          Welcome back! Log in to continue helping others.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="input-field"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#22D3EE] hover:bg-[#0ea5e9] text-white font-semibold rounded-full shadow-lg"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </motion.button>
        </form>

        <GoogleButton text="Log in with Google" />

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#22D3EE] hover:underline">Sign up</Link>
        </p>
        <ToastContainer />
      </motion.div>
    </div>
  )
}

export default Login
