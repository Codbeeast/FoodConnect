import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
type FoodGalleryProps = {
  onClose: () => void
}

type FoodItem = {
  _id: string
  imageUrl: string
  foodName: string
  quantity: string
  location: string
  note: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

const FoodGallery = ({ onClose }: FoodGalleryProps) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  let capitalized = (e: string) => (e.charAt(0).toUpperCase() + e.slice(1))
  useEffect(() => {
    const fetchFoodItems = async () => {
      document.body.classList.add('no-scroll')
      try {
        const res = await fetch(`${baseURL}/api/foodData`)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data = await res.json()

        // ✅ Fix: handle array directly
        setFoodItems(Array.isArray(data) ? data : [])
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodItems()
    return () => {
      // Unlock scroll when gallery is closed
      document.body.classList.remove('no-scroll')
    }
  }, [baseURL])

  return (
    
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed inset-0 bg-[#0A0E1A] z-[100] overflow-y-auto px-4 py-6 "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#22D3EE]">Uploaded Food</h2>
        <button onClick={onClose} className="text-white">
          <X size={28} />
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-white">Please Wait Server Is 😴Sleeping...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : foodItems.length === 0 ? (
        <p className="text-gray-400">No food items uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition hover:scale-105"
            >
              <img
                src={item.imageUrl}
                alt={item.foodName}
                className="w-full h-64 object-cover"
              />capitalised(
            )  <div className="px-4 space-y-1">
                <h3 className="text-lg mt-[-8px] font-semibold text-[#0F172A]">{capitalized(item.foodName)}</h3>
                <p className="text-sm text-gray-700"> Donor Name: {capitalized(user?.name ?? 'Anonymous')}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-700">Location: {capitalized(item.location)}</p>
                <p className="text-sm mb-2 text-gray-600 italic">Note: {capitalized(item.note)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default FoodGallery
