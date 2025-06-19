import Food from '../models/food.js'
import cloudinary from '../utils/cloudinary.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import admin from '../utils/firebaseAdmin.js' // ✅ New

// Simulated tokens (You should store these in DB in real case)
let fcmTokens = [] // should be fetched from MongoDB or Redis

export const postFoodImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: uuidv4(),
      folder: 'your-app-images'
    })

    fs.unlinkSync(req.file.path)

    const { foodName, quantity, location, note, uploaderToken } = req.body

    const saved = await Food.create({
      imageUrl: result.secure_url,
      foodName,
      quantity,
      location,
      note,
    })

    // 🔔 Send notification to other users (exclude uploader)
    const recipients = fcmTokens.filter(token => token !== uploaderToken)

    if (recipients.length > 0) {
      const message = {
        notification: {
          title: "🍱 New Food Uploaded!",
          body: `${foodName} is now available at ${location}`,
        },
        tokens: recipients,
      }

      await admin.messaging().sendMulticast(message)
    }

    res.json({ success: true, data: saved })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Upload failed' })
  }
}

export const getFoodImage = async (req, res) => {
  try {
    const images = await Food.find().sort({ createdAt: -1 })
    res.json(images)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Fetch failed' })
  }
}
