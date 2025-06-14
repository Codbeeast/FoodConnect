'use client'
import { motion } from 'framer-motion'

const Contact = () => {
  return (
    <section
      id="contact"
      className="sm:py-5 pt-20 md:pt-21  bg-[#0A0E1A] text-white px-6 scroll-mt-24 min-h-screen"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-[#22D3EE] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Contact
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: false }}
        >
          Have a question, feedback, or want to collaborate? We'd love to hear from you!
        </motion.p>

        <motion.div
          className="max-w-xl mx-auto bg-[#1E293B] p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: false }}
        >
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white text-black px-4 py-2 rounded-md outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white text-black px-4 py-2 rounded-md outline-none"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="bg-white text-black px-4 py-2 rounded-md outline-none resize-none"
            />
            <button
              type="submit"
              className="bg-[#22D3EE] text-black font-semibold py-2 px-6 rounded-md hover:bg-[#0EA5E9] transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
