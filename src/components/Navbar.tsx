import { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'
import Avatar from './Avatar'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About Us', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Contact', id: 'contact' },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home') // default active section

  // Update active section on scroll using IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, options)

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
        <ScrollLink to="home" smooth={true} duration={500} offset={-80} className="text-2xl font-bold text-[#22D3EE] hover:text-white cursor-pointer">
          FoodConnect
        </ScrollLink>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-6 text-sm font-semibold tracking-wide">
          {navItems.map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.97 }}>
              <ScrollLink
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                }`}
              >
                {item.name}
              </ScrollLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile toggle + avatar */}
        <div className="flex items-center gap-4">
          <div className="sm:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <Avatar />
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-full left-0 w-full bg-[#0A0E1A] py-4 px-6 flex flex-col gap-4 text-sm font-semibold tracking-wide shadow-md z-40"
          >
            {navItems.map((item, index) => (
              <ScrollLink
                key={index}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setMobileOpen(false)}
                className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#22D3EE] bg-[#22D3EE]/10 border-b-2 border-[#22D3EE]'
                    : 'text-gray-300 hover:text-[#22D3EE]'
                }`}
              >
                {item.name}
              </ScrollLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
