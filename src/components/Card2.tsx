import { img2, img3 } from '.././images/Url'
import { motion } from 'framer-motion'

const Card2 = () => {
  return (
    <motion.div
      className="relative mt-8 px-4 lg:w-full w-11/12 z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="relative bg-[#0F172A] text-white shadow-xl p-8 rounded-2xl border border-[#1E293B] flex flex-col gap-8">
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-center bg-gradient-to-r from-[#22D3EE] to-[#22C55E] bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          How FoodConnect Works
        </motion.h2>

        {/* Info Sections */}
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            className="flex-1 space-y-3 text-base leading-relaxed text-slate-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-[#38BDF8]">For Donors</h3>
            <ul className="list-disc list-inside">
              <li>Upload food details with a photo</li>
              <li>AI analyzes freshness from image/date</li>
              <li>Set pickup location & time availability</li>
            </ul>
          </motion.div>

          <motion.div
            className="flex-1 space-y-3 text-base leading-relaxed text-slate-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-[#22C55E]">For NGOs / Individuals</h3>
            <ul className="list-disc list-inside">
              <li>Get notified when food is available nearby</li>
              <li>Filter by freshness, location, urgency</li>
              <li>Request pickup or contact the donor</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Images */}
        <motion.div
          className="w-full h-auto flex flex-col lg:flex-row gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.img
            src={img2}
            alt="Donating Food"
            className="w-full lg:w-1/2 h-64 object-cover rounded-xl shadow-md hover:shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={img3}
            alt="Receiving Food"
            className="w-full lg:w-1/2 h-64 object-cover rounded-xl shadow-md hover:shadow-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Card2
