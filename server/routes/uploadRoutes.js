import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Food from '../models/food.js'

const router = express.Router()

// Use /tmp for file uploads (e.g., for Render)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '/tmp/uploads'
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

// POST /upload – upload a food image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        console.log('Upload route hit')
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        const imageUrl = `uploads/${req.file.filename}`

        // Save to MongoDB
        const newFood = new Food({ imageUrl })
        await newFood.save()

        console.log('File uploaded and saved to DB:', imageUrl)

        res.status(200).json({
            message: 'File uploaded successfully',
            food: newFood
        })
    } catch (err) {
        console.error('Upload error:', err)
        res.status(500).json({ error: 'Server error' })
    }
})

// ✅ GET /foods – fetch all uploaded food items
router.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 })
        res.status(200).json(foods)
    } catch (err) {
        console.error('Fetch error:', err)
        res.status(500).json({ error: 'Failed to fetch food items' })
    }
})




export default router
