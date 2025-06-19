import Food from '../models/food.js'
import cloudinary from '../utils/cloudinary.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

export const postFoodImage=async (req, res) => {
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
}

export const getFoodImage= async (req, res) => {
  try {
    const images = await Food.find().sort({ createdAt: -1 })
    res.json(images)
  
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Fetch failed' })
  }
}