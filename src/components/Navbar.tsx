// components/Navbar.tsx
import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Avatar from '@mui/material/Avatar'
import { deepOrange } from '@mui/material/colors'
import FoodGallery from './FoodGallery'
import { useAuth } from '../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'Services', id: 'services' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
  { name: 'Uploaded Food', id: 'gallery' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showGallery, setShowGallery] = useState(false)
  const { isAuthenticated, initials } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
      }
    )

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0A0E1A] px-4 sm:px-6 py-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.h1
          className="text-2xl sm:text-3xl font-extrabold text-[#22D3EE] cursor-pointer flex"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {'FoodConnect'.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: [0, -8, 0],
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                    delay: index * 0.05,
                  },
                },
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Mobile menu button */}
        <div className="sm:hidden flex gap-4">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isAuthenticated &&
            <Avatar
              onClick={() => navigate('/')}
              sx={{
                bgcolor: deepOrange[500],
                cursor: 'pointer',
                width: 40,
                height: 40,
                fontSize: '1rem',
              }}
            >
              {initials || '?'}
            </Avatar>
          }
        </div>



        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-6 text-sm font-semibold tracking-wide">
          {navItems.map((item, index) =>
            item.name === 'Uploaded Food' ? (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }}>
                <button
                  onClick={() => setShowGallery(true)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 ${showGallery
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </button>
              </motion.div>
            ) : (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }}>
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-300 ${activeSection === item.id
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </ScrollLink>
              </motion.div>
            )
          )}
        </div>

        {/* Auth / Avatar - Desktop Only */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated ? (
           
            <>
             
              <button
                onClick={async () => {
                  try {
                    await signOut(auth) // ✅ properly sign out from Firebase
                    localStorage.removeItem('user')
                    setMobileOpen(false)
                    navigate('/')
                    window.location.reload()
                  } catch (error) {
                    console.error("Logout error:", error)
                  }
                }}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-full font-semibold text-sm shadow-md transition duration-300"
              >
                Logout
              </button>
              <Avatar
                onClick={() => navigate('/')}
                sx={{
                  bgcolor: deepOrange[500],
                  cursor: 'pointer',
                  width: 40,
                  height: 40,
                  fontSize: '1rem',
                }}
              >
                {initials || '?'}
              </Avatar>
            </>
          ) : ( 
             <>
           

            <button
              onClick={() => navigate('/login')}
              className="text-white bg-[#22D3EE] hover:bg-[#0ea5e9] px-4 py-1 rounded-full font-semibold text-sm shadow-md"
              >
              Login
            </button>
              </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-full left-0 w-full bg-[#0A0E1A] py-4 px-6 flex flex-col gap-4 text-sm font-semibold tracking-wide shadow-md z-40"
          >
            {navItems.map((item, index) =>
              item.name === 'Uploaded Food' ? (
                <button
                  key={index}
                  onClick={() => {
                    setMobileOpen(false)
                    setShowGallery(true)
                  }}
                  className={`px-3 py-2 rounded-md transition-all duration-300 ${showGallery
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </button>
              ) : (
                <ScrollLink
                  key={index}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 cursor-pointer rounded-md transition-all duration-300 ${activeSection === item.id
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                    }`}
                >
                  {item.name}
                </ScrollLink>
              )
            )}

            {/* Auth - Mobile Only */}
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  try {
                    await signOut(auth) // ✅ properly sign out from Firebase
                    localStorage.removeItem('user')
                    setMobileOpen(false)
                    navigate('/')
                    window.location.reload()
                  } catch (error) {
                    console.error("Logout error:", error)
                  }
                }}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-full font-semibold text-sm shadow-md transition duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  navigate('/login')
                }}
                className="text-white bg-[#22D3EE] hover:bg-[#0ea5e9] px-3 py-2 rounded-full font-semibold text-sm shadow-md transition duration-300"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && <FoodGallery onClose={() => setShowGallery(false)} />}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
