import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
type Props = {
  onClose: () => void
}

const UploadCard = ({ onClose }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
const baseURL = import.meta.env.VITE_API_URL
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }
  const handleSubmit = async () => {
  if (!fileInputRef.current?.files?.[0]) return

  const formData = new FormData()
  formData.append('image', fileInputRef.current.files[0])

  try {
    const res = await fetch( `${baseURL ? baseURL : 'http://localhost:5000'}/api/upload`, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
     toast.success('Uploaded!')
      setSelectedImage(null)
      onClose()
    } else {
      toast.error('❌ Upload failed.')
    }
  } catch (err) {
    
    toast.error('🚨 Error uploading image.')
    
  }
}


  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 w-full sm:w-[85%] h-full bg-gradient-to-br from-[#0F172A] via-[#0A0E1A] to-[#0F172A] z-50 shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-start overflow-y-auto"
    >
      {/* Heading Section */}
      <div className="mb-8 text-center space-y-2">
       <motion.h1
  className="flex justify-center text-4xl sm:text-5xl font-extrabold text-[#22D3EE] drop-shadow mb-2"
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {"FoodConnect".split("").map((char, index) => (
    <motion.span
      key={index}
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: [0, -8, 0],
          opacity: 1,
          transition: {
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
            delay: index * 0.05,
          }
        }
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ))}
</motion.h1>

        <p className="text-lg sm:text-xl text-slate-300 italic">
          Turning surplus into support — one meal at a time.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-[#1E293B]/30 border border-[#334155] rounded-2xl p-6 w-full max-w-xl shadow-lg backdrop-blur-md">
        {/* Upload Title */}
        <h2 className="text-2xl font-bold text-[#38BDF8] mb-6 text-center">
          Upload Food Image Here
        </h2>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-[#22D3EE] hover:bg-[#0ea5e9] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 text-lg"
          >
            <UploadCloud size={20} /> Choose Image
          </button>
        </div>

        {/* Preview Image */}
        {selectedImage && (
          <div className="mb-6 flex justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-64 rounded-2xl border-4 border-[#38BDF8] shadow-xl"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-full font-medium shadow-md"
          >
            <XCircle size={18} /> Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#22C55E] hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default UploadCard
