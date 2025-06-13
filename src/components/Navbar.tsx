import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar from './Avatar'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="w-full bg-[#0A0E1A] px-4 sm:px-6 py-4 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-bold text-[#22D3EE] hover:text-white transition-all duration-300">
          FoodConnect
        </Link>

        {/* Center - Desktop Nav */}
        <div className="hidden sm:flex gap-6 text-sm font-semibold tracking-wide">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer"
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md transition-all duration-300 ${isActive
                      ? 'bg-[#22D3EE]/10 text-[#22D3EE] border-b-2 border-[#22D3EE]'
                      : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Right - Avatar + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white focus:outline-none">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Avatar - Always Visible */}
          <Avatar />
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-full left-0 w-full bg-[#0A0E1A] py-4 px-6 flex flex-col gap-4 text-sm font-semibold tracking-wide shadow-md z-40"
          >

            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 ${isActive
                      ? 'bg-[#22D3EE]/10 text-[#22D3EE] border-b-2 border-[#22D3EE]'
                      : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
