import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Avatar from './Avatar'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const location = useLocation()

  return (
<nav className="w-full bg-[#0A0E1A] px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center shadow-lg gap-4">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-[#22D3EE] hover:text-white transition-all duration-300">
        FoodConnect
      </Link>

      {/* Nav Links */}
<div className="hidden sm:flex flex-wrap gap-4 sm:gap-6 text-sm font-semibold tracking-wide">     
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
                className={`px-3 py-2 rounded-md transition-all duration-300 ${
                  isActive
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

      {/* Avatar */}
      <div className="ml-4">
        <Avatar />
      </div>
    </nav>
  )
}

export default Navbar
