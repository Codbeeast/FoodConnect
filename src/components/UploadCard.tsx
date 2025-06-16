import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, X } from 'lucide-react'
import VoiceAssistant from './VoiceAssistant'

type Props = {
  onClose: () => void
}

const UploadCard = ({ onClose }: Props) => {
  const [showAssistant, setShowAssistant] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setImageFile(file)
      setShowAssistant(true)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 w-full sm:w-[85%] h-full bg-gradient-to-br from-[#0F172A] via-[#0A0E1A] to-[#0F172A] z-50 shadow-2xl p-6 sm:p-10 flex flex-col items-center justify-start overflow-y-auto"
    >
      {/* Heading */}
      <div className="mb-8 text-center space-y-2">
        <motion.h1
          className="flex justify-center text-4xl sm:text-5xl font-extrabold text-[#22D3EE] drop-shadow mb-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <button
            onClick={onClose}
            className="text-white absolute md:left-[-22vw] left-[-2vw] top-[-1vh] md:top-[-4vh]"
          >
            <X size={28} />
          </button>
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
                    delay: index * 0.05
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
      <div className="bg-[#1E293B]/30 border border-[#334155] rounded-2xl p-6 w-full mt-10 max-w-xl shadow-lg backdrop-blur-md">
        <h2 className="text-2xl font-bold text-[#38BDF8] mb-6 text-center">
          Upload Food Image Here
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex justify-center mb-6">
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 bg-[#22D3EE] hover:bg-[#0ea5e9] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 text-lg"
          >
            <UploadCloud size={20} /> Choose Image
          </button>
        </div>
      </div>

      {/* Voice Assistant Overlay */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
          >
            <div className="w-full max-w-4xl mx-auto">
              <VoiceAssistant
                imageFile={imageFile}
                selectedImage={selectedImage}
                onSubmitSuccess={() => {
                  setShowAssistant(false)
                  setSelectedImage(null)
                  setImageFile(null)
                  onClose()
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default UploadCard
