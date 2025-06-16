import { useState } from 'react'
import { img } from '.././images/Url'
import { motion, AnimatePresence } from 'framer-motion'
import UploadCard from './UploadCard'
import AnimatedText from './AnimatedText'

const Card = () => {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <>
      {/* Main Card Container */}
      <motion.div
        className="relative overflow-hidden w-full max-w-[100%] pt-35 mx-auto rounded-none sm:rounded-2xl shadow-2xl min-h-[100vh] sm:min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Background Image */}
        <img
          src={img}
          alt="Food Donation Banner"
          className="absolute inset-0 w-full h-full object-cover brightness-60"
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white px-4 sm:px-8 py-12 text-center h-full">
          {/* Animated Heading */}
          <motion.div
            className="flex flex-wrap justify-center text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {'Welcome to FoodConnect'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="mx-1 inline-block"
                variants={{
                  hidden: { scale: 0.5, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline Animation */}
          <AnimatedText />

          {/* Upload Button */}
          <motion.button
            onClick={() => setShowUpload(true)}
            className="mt-6 bg-[#22D3EE] hover:bg-[#0ea5e9] text-white font-semibold px-6 py-2 rounded-full shadow-lg transition duration-300 text-base sm:text-lg"
            whileHover={{ scale: 1.05 }}
          >
            Upload Food
          </motion.button>
        </div>
      </motion.div>

      {/* Upload Overlay */}
      <AnimatePresence>
        {showUpload && <UploadCard onClose={() => setShowUpload(false)} />}
      </AnimatePresence>
    </>
  )
}

export default Card
