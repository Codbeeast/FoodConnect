import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
  imageUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  // Add more fields later like description, quantity, etc.
})

export default mongoose.model('Food', foodSchema)
