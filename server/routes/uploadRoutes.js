import express from 'express'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import Food from '../models/food.js'
const router = express.Router()

const upload = multer({ dest: 'temp/' })
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: uuidv4(),
      folder: 'your-app-images'
    })

    fs.unlinkSync(req.file.path)
    const saved = await Food.create({ url: result.secure_url })

    res.json({ success: true, url: saved.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Upload failed' })
  }
})
router.get('/foods', async (req, res) => {

  try {
    const images = await Food.find().sort({ uploadedAt: -1 })
    res.json({ success: true, images })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Failed to fetch images' })
  }
})
export default router

    

