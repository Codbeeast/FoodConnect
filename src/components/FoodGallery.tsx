import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

// Type for props
type FoodGalleryProps = {
  onClose: () => void
}

// Type for a single food item
type FoodItem = {
  _id: string
  imageUrl: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

const FoodGallery = ({ onClose }: FoodGalleryProps) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await fetch(`${baseURL}/api/foods`)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data: FoodItem[] = await res.json()
        setFoodItems(data)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchFoodItems()
  }, [baseURL])

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed inset-0 bg-[#0A0E1A] z-[100] overflow-y-auto px-4 py-6"
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
        <p className="text-white">Loading...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : foodItems.length === 0 ? (
        <p className="text-gray-400">No food items uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={`${baseURL}/${item.imageUrl}`}
                alt="Food"
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default FoodGallery
