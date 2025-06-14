import { motion } from 'framer-motion'

const Card2 = () => {
  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto px-4 mt-4 mb-4 z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="relative min-h-[80vh] bg-[#0f172a99] backdrop-blur-md text-white shadow-2xl p-12 rounded-3xl border border-[#1E293B] flex flex-col gap-16 hover:scale-[1.01] transition-all duration-500"
        initial={{ opacity: 0.8, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-center bg-gradient-to-r from-[#22D3EE] to-[#22C55E] bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
        >
          How FoodConnect Works
        </motion.h2>

        {/* Info Sections */}
        <motion.div
          className="flex flex-col lg:flex-row gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
        >
          {/* For Donors */}
          <motion.div
            className="flex-1 space-y-5 text-lg lg:text-xl leading-relaxed text-slate-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-2xl font-semibold text-[#38BDF8]">For Donors</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Upload food details with a photo or description</li>
              <li>AI analyzes freshness based on image/date</li>
              <li>Set pickup location and time for NGOs</li>
              <li>Receive confirmation when food is claimed</li>
            </ul>
          </motion.div>

          {/* For NGOs */}
          <motion.div
            className="flex-1 space-y-5 text-lg lg:text-xl leading-relaxed text-slate-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-2xl font-semibold text-[#22C55E]">For NGOs / Individuals</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Get notified when food is available nearby</li>
              <li>Search and filter food based on freshness, urgency, or distance</li>
              <li>Request pickup with one click</li>
              <li>Contact donors directly through secure messaging</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Card2
