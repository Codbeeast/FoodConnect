// pages/Login.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GoogleButton from './GoogleAuthButton'

const Login = () => {
  const handleGoogleLogin = () => {
    console.log('Google Login')
    // Add Google login logic here
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

        <form className="space-y-5">
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <input type="password" required placeholder="••••••••" className="input-field" />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 bg-[#22D3EE] hover:bg-[#0ea5e9] text-white font-semibold rounded-full shadow-lg"
          >
            Log In
          </motion.button>
        </form>

        {/* Google Auth */}
        <GoogleButton onClick={handleGoogleLogin} text="Log in with Google" />

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#22D3EE] hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
