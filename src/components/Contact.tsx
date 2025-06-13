// import React from 'react'

const Contact = () => {
  return (
    <div>
<section id="contact" className="py-4 bg-[#0A0E1A] text-white px-6 scroll-mt-24">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#22D3EE] mb-6">Contact Us</h2>
    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
      Have a question, feedback, or want to collaborate? We'd love to hear from you!
    </p>

    <div className="max-w-xl mx-auto bg-[#1E293B] p-8 rounded-xl shadow-lg">
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
    </div>
    
    {/* Add extra padding below to allow scroll */}
    <div className="h-24"></div>
  </div>
</section>


    </div>
  )
}

export default Contact
