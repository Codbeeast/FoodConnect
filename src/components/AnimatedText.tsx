import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

const AnimatedText = () => {
  const tagline =
    'Connecting surplus food from restaurants, hotels, and households to NGOs and individuals in need — with AI-powered freshness checks and pickup coordination.'
  const words = tagline.split(' ')
  const controls = useAnimation()
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    const animate = async () => {
      await controls.start('visible')
      setTimeout(() => {
        controls.set('hidden')
        setIteration((i) => i + 1)
      }, 2000) // Reset after 2s
    }
    animate()
  }, [iteration])

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  }

  return (
    <motion.div className="max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-white drop-shadow-md flex flex-wrap justify-center">
      {words.map((word, i) => (
        <motion.span
          key={`${iteration}-${i}`} // Important to reset with each cycle
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={controls}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedText
