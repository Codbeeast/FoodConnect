import { img } from '.././images/Url'
import { motion } from 'framer-motion'

const Card = () => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden w-full max-w-[98.5%] mx-auto h-[60vh] sm:h-[70vh] md:h-[65vh] mt-3 shadow-2xl mr-1"
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

      {/* Text Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-8 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-[#38BDF8] drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to FoodConnect
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed text-slate-200 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Connecting surplus food from restaurants, hotels, and households to NGOs and individuals in need —
          with AI-powered freshness checks and pickup coordination.
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Card
