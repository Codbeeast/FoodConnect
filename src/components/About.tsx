'use client'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="sm:py-28 sm:pt-25 bg-[#0A0E1A] py-25 pb-28  text-white px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-[#22D3EE] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          <span className="font-semibold text-white">FoodConnect</span> is a socially-driven platform built to reduce food waste and bridge the gap between food donors and those in need. Whether you’re a restaurant, hotel, or household with surplus food, or an NGO seeking to serve the underprivileged — FoodConnect ensures that every extra meal finds the right plate.
        </motion.p>

        <motion.p
          className="mt-6 text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: false }}
        >
          By leveraging real-time data, AI-driven freshness detection, and seamless communication tools, we empower communities to donate, request, and deliver food responsibly and efficiently.
        </motion.p>
      </div>
    </section>
  )
}

export default About
