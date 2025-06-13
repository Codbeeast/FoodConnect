import { img } from '.././images/Url'
import { motion } from 'framer-motion'

const Card = () => {
  return (
  <motion.div
  className="relative rounded-2xl overflow-hidden w-11/12 lg:w-[98.5%] h-72 sm:h-80 md:h-96 m-2 mr-1 mt-1 shadow-lg"

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <img
        src={img}
        alt="Food Donation Banner"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-[#38BDF8]">Welcome to FoodConnect</h1>
        <p className="text-sm sm:text-base lg:text-lg max-w-2xl">
          Connecting surplus food from restaurants, hotels, and households to NGOs and individuals in need — 
          with AI-powered freshness checks and pickup coordination.
        </p>
      </div>
    </motion.div>
  )
}

export default Card
