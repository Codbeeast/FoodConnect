import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

// Use /tmp for file uploads on Render
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = '/tmp/uploads'
    fs.mkdirSync(uploadPath, { recursive: true }) // ensure folder exists
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Upload route hit')
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    console.log('File uploaded:', req.file.path)

    res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
