import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast';
type Props = {
  imageFile: File | null
  selectedImage: string | null
  onSubmitSuccess: () => void
}

// For TypeScript support of webkitSpeechRecognition
interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continuous = true
recognition.lang = 'en-US'

const VoiceAssistant = ({ imageFile, selectedImage, onSubmitSuccess }: Props) => {
  const formSectionRef = useRef<HTMLDivElement | null>(null)

  const [form, setForm] = useState({ image: '', foodName: '', quantity: '', location: '', note: '' })
  const [step, setStep] = useState(0)
  const [active, setActive] = useState(false)
  const [listening, setListening] = useState(false)
  // const [transcript, setTranscript] = useState<string>([])
  const [btn, setBtn] = useState(true)
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const stepRef = useRef(step)
  const activeRef = useRef(active)
  const formRef = useRef(form)

  const clickbtn = () => {
    if (btn == false) {
      setListening(false)
      speak("Voice Assistant Deactivated")
      setForm({ image: '', foodName: '', quantity: '', location: '', note: '' })
    }
    setBtn(!btn)
    setActive(false)
    setForm({ image: '', foodName: '', quantity: '', location: '', note: '' })
  }
  useEffect(() => {
    if (active && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    stepRef.current = step
    activeRef.current = active
    formRef.current = form
  }, [step, active, form])

  const speak = (text: string) => {
    // if (listening) recognition.abort()

    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'

    utterance.onstart = () => {
      console.log('🔊 Speaking started...')
    }

    utterance.onend = () => {
      console.log('🔊 Speaking ended.')
      if (activeRef.current && !listening) {
        try {
          recognition.start()
        } catch (e) {
          console.warn('Speech recognition already started.')
        }
      }
    }

    synth.cancel()
    synth.speak(utterance)
  }

  const handleCommand = (command: string) => {
    console.log('Recognized command:', command)
    const normalizedCommand = command.replace(/\s+/g, '')

    if (!activeRef.current && normalizedCommand.includes('foodconnect')) {
      setActive(true)
      activeRef.current = true
      speak('Voice Assistant activated. Please tell the food name.')
      setStep(1)
      stepRef.current = 1
    } else if (stepRef.current === 1) {
      const updated = { ...formRef.current, foodName: command }
      setForm(updated)
      formRef.current = updated
      speak('Got it. Now tell the quantity.')
      setStep(2)
      stepRef.current = 2
    } else if (stepRef.current === 2) {
      const numberWords: { [key: string]: string } = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        ten: '10',
        to: '2',     // handles misheard "two"
        too: '2'     // handles misheard "two"
      }

      const quantityWord = command.toLowerCase().trim()
      const numericQuantity = numberWords[quantityWord] || quantityWord

      const updated = { ...formRef.current, quantity: numericQuantity }
      setForm(updated)
      formRef.current = updated
      speak('Okay. Tell me the location.')
      setStep(3)
      stepRef.current = 3
    }
    else if (stepRef.current === 3) {
      const updated = { ...formRef.current, location: command }
      setForm(updated)
      formRef.current = updated
      speak('Noted. Any note or instruction?')
      setStep(4)
      stepRef.current = 4
    } else if (stepRef.current === 4) {
      const updated = { ...formRef.current, note: command }
      setForm(updated)
      formRef.current = updated
      speak('Say submit to complete the process.')
      setStep(5)
      stepRef.current = 5
    } else if (stepRef.current === 5 && command.includes('submit')) {
      speak('Thank you for your donation!')
      setBtn(true)
      submitForm()
      setActive(false)
      setListening(false)
      activeRef.current = false
      setStep(0)
      stepRef.current = 0
    }
  }
  let capitalized = (e: string) => (e.charAt(0).toUpperCase() + e.slice(1))

  useEffect(() => {
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const command = e.results[e.resultIndex][0].transcript.trim().toLowerCase()
      // setTranscript(command)
      handleCommand(command)
    }

    recognition.onstart = () => {
      console.log('Listening started')
      setListening(true)
    }

    recognition.onend = () => {
      console.log('Listening ended')
      setListening(false)
      if (activeRef.current && !window.speechSynthesis.speaking) {
        try {
          recognition.start()
        } catch (e) {
          console.warn('Speech recognition already started.')
        }
      }
    }

    recognition.onerror = (e: any) => {
      console.error('Speech recognition error:', e.error)
      setListening(false)
    }

    return () => {
      recognition.stop()
    }
  }, [])

 const submitForm = async () => {
  const loadingToast = toast.loading('Please wait, server is 😴sleeping...')

  try {
    const formData = new FormData()
    const token = localStorage.getItem('token') || '' 
    if (imageFile) {
      formData.append('image', imageFile)
    }

    formData.append('foodName', formRef.current.foodName)
    formData.append('quantity', formRef.current.quantity)
    formData.append('location', formRef.current.location)
    formData.append('note', formRef.current.note)
    formData.append('uploaderToken', token || '') 
    const res = await fetch(`${baseURL}/api/data`, {
      method: 'POST',
      body: formData,
    })

    toast.dismiss(loadingToast) // Remove the loading toast

    if (res.ok) {
      toast.success('✅ Thank you! Submission successful.')
      onSubmitSuccess() // Go back to Card
    } else {
      toast.error('❌ Submission failed.')
      onSubmitSuccess()
    }

  } catch (err) {
    console.error('Error submitting form:', err)
    toast.dismiss(loadingToast)
    toast.error('❌ Error during submission.')
    onSubmitSuccess()
  }

  setForm({
    image: '',
    foodName: '',
    quantity: '',
    location: '',
    note: '',
  })
}


  const startAssistant = () => {
    setListening(true)
    try {
      recognition.start()
    } catch (e) {
      console.warn('Recognition already running')
    }
    speak('Say FoodConnect to begin.')
  }
  const exit = () => {
    setListening(false)
    setActive(false)
    onSubmitSuccess()
    speak("")
    setForm({ image: '', foodName: '', quantity: '', location: '', note: '' })
  }

  return (
    // outer wrapper: full screen, fixed, overlay
    <div className="noo-scroll fixed inset-0 z-50 bg-black bg-opacity-80 backdrop-blur-md overflow-y-auto">
      {/* Assistant container */}
      <div className="text-white p-6 w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-y-auto">

        {/* Sticky header with X button */}
        <div className="w-full flex sticky top-0 z-50 ">
          <button onClick={exit} className="sticky top-0 z-50 text-white bg-red-600 px-4 py-2 font-semibold rounded-full hover:bg-red-700 transition">
            X
          </button>
        </div>

        {/* Start/Stop button */}
        <div className="text-center mt-2">
          {btn ? (
            <button
              onClick={() => {
                startAssistant()
                clickbtn()
              }}
              className="bg-indigo-600 mt-5 hover:scale-95 active:scale-105 px-5 py-3 rounded-xl text-white font-semibold text-2xl shadow-lg"
            >
              🎤 Start Voice Assistant
            </button>
          ) : (
            <button
              onClick={clickbtn}
              className="bg-red-600 mt-5 active:scale-105 hover:scale-95 px-5 py-3 text-2xl rounded-xl text-white font-semibold shadow-lg"
            >
              🎤 Stop Voice Assistant
            </button>
          )}
        </div>

        {/* Listening status */}
        <div className="mt-5 text-3xl text-center mb-10">
          {listening ? (
            <p className="text-green-400 animate-pulse">🎧 Listening...</p>
          ) : (
            <p className="text-gray-400">🛑 Not listening</p>
          )}
        </div>

        {/* Preview Image */}
        {selectedImage && (
          <div className="mb-4 flex justify-center">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-64 rounded-2xl border-4 border-[#38BDF8] shadow-xl"
            />
          </div>
        )}

        {/* Assistant Form */}
        <AnimatePresence>
          {active && (
            <motion.div
              ref={formSectionRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-10 w-full max-w-2xl backdrop-blur-md p-6 rounded-2xl mt-6 shadow-xl"
            >
              <h2 className="text-4xl font-bold mb-4 text-blue-700">📝 Donation Form</h2>
              <p className="text-black text-2xl mb-2"><strong>Food Name:</strong> {capitalized(form.foodName)}</p>
              <p className="text-black text-2xl mb-2"><strong>Quantity:</strong> {form.quantity}</p>
              <p className="text-black text-2xl mb-2"><strong>Location:</strong> {capitalized(form.location)}</p>
              <p className="text-black text-2xl mb-2"><strong>Note:</strong> {capitalized(form.note)}</p>
              <div className="mt-3 text-center">
                <button
                  onClick={submitForm}
                  className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl text-white font-semibold shadow-lg"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

  )
}

export default VoiceAssistant
