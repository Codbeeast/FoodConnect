import express from 'express'
import multer from 'multer'
import Food from '../models/food.js'
// import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
const router = express.Router()
const upload = multer({ dest: 'temp/' })

// Upload endpoint
router.post('/data',upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
          public_id: uuidv4(),
          folder: 'your-app-images'
        })
    
        fs.unlinkSync(req.file.path)
    // Destructure the fields from JSON
    const { foodName, quantity, location, note } = req.body

    // Save to MongoDB
    const saved = await Food.create({imageUrl: result.secure_url, foodName, quantity, location, note })

    res.json({ success: true, data: saved })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Upload failed' })
  }
})


// Get all images
router.get('/foodData', async (req, res) => {
  try {
    const images = await Food.find().sort({ createdAt: -1 })
    res.json(images)
  
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Fetch failed' })
  }
})

export default router
