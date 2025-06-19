import mongoose from 'mongoose'
const tokenSchema = new mongoose.Schema({
  userId: String,
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
})
 const Token = mongoose.model("FcmToken", tokenSchema)
 export default Token
