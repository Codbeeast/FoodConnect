import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import foodRoutes from './routes/foodRoute.js'
import userRoute from './routes/userRoute.js'
import signUpRoute from './routes/signUpRoute.js'
import tokenRoute from './routes/tokenRoute.js'
const URL=process.env.MONGODB_URL
const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'https://foodconnect-4z1p.onrender.com'],
  credentials: true,
}));

// Add this before your routes
app.use(express.json());
app.use('/uploads', express.static('uploads')) // serve uploaded images
app.use('/uploads', express.static('/tmp/uploads')) // for Render
app.use('/api',foodRoutes)
app.use('/api',userRoute)
app.use('/api', signUpRoute)
app.use('/api', tokenRoute)
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
