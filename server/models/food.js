import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
  fullName: String,
  userId  : String,
  imageUrl: String,
  foodName: String,
  quantity: String,
  location: String,
  note: String,
  url: {
    type: String,
    required: false // ✅ fix
  }
}, {
  timestamps: true
})
 
export default mongoose.model('fooddata', foodSchema)
