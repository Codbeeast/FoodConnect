'use client'
import { motion } from 'framer-motion'

const Services = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    }),
  }

  return (
    <section id="services" className="sm:py-30 sm:pb-10 py-30 bg-[#0A0E1A] text-white px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-[#0EA5E9] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {[
            {
              title: 'Food Donation',
              desc: 'Upload surplus food details, photos, and availability times. Our platform uses AI to assess freshness and notify nearby NGOs or seekers.'
            },
            {
              title: 'NGO Matching',
              desc: 'NGOs and individuals can search, filter, and request food pickups based on location, urgency, and availability.'
            },
            {
              title: 'Freshness Analysis',
              desc: 'Our AI system intelligently analyzes image and time data to ensure food is still safe and consumable before sharing.'
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              className="p-6 border rounded-xl shadow-md hover:shadow-lg transition bg-white text-black"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: false }}
            >
              <h3 className="text-xl font-semibold text-[#0EA5E9] mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
