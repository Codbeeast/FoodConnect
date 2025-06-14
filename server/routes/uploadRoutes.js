import express from 'express'
import multer from 'multer'
import Image from '../models/Image.js'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

// Upload Route
router.post('/upload', upload.single('image'), async (req, res) => {
  const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  const newImage = new Image({ imageUrl: imagePath })
  await newImage.save()
  res.status(201).json(newImage)
})

// Get all images
router.get('/images', async (req, res) => {
  const images = await Image.find().sort({ uploadedAt: -1 })
  res.json(images)
})

export default router
