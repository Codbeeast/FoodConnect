// import React from 'react'

const Services = () => {
  return (
    <div>
     <section id="services" className="py-20 bg-white text-gray-800 px-6 scroll-mt-24">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#0EA5E9] mb-6">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
      
      <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-[#0EA5E9] mb-2">Food Donation</h3>
        <p className="text-gray-600">
          Upload surplus food details, photos, and availability times. Our platform uses AI to assess freshness and notify nearby NGOs or seekers.
        </p>
      </div>

      <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-[#0EA5E9] mb-2">NGO Matching</h3>
        <p className="text-gray-600">
          NGOs and individuals can search, filter, and request food pickups based on location, urgency, and availability.
        </p>
      </div>

      <div className="p-6 border rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold text-[#0EA5E9] mb-2">Freshness Analysis</h3>
        <p className="text-gray-600">
          Our AI system intelligently analyzes image and time data to ensure food is still safe and consumable before sharing.
        </p>
      </div>

    </div>
  </div>
</section>


    </div>
  )
}

export default Services
