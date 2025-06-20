import Food from '../models/food.js'
import cloudinary from '../utils/cloudinary.js'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import admin from '../utils/firebaseAdmin.js'
import FcmToken from "../models/token.js"
// import { deleteAll } from './foodController';




export const postFoodImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: uuidv4(),
      folder: 'your-app-images'
    })

    fs.unlinkSync(req.file.path)

    const { foodName, quantity, location, note, uploaderToken, userId,fullName } = req.body
  //  console.log("full: ",fullName)
    const saved = await Food.create({
      fullName,
      userId,
      imageUrl: result.secure_url,
      foodName,
      quantity,
      location,
      note,
    })
    const allTokens = await FcmToken.find({}, 'token').lean()
    const fcmTokens = allTokens.map(t => t.token)
    // 🔔 Send notification to other users (exclude uploader)
    const recipients = fcmTokens.filter(token => token !== uploaderToken)
    let capitalized = (e) => (e.charAt(0).toUpperCase() + e.slice(1))

    if (recipients.length > 0) {
      const message = {

        notification: {

          title: "🍱 New Food Uploaded!",
          body: `${capitalized(foodName)} is now available at ${capitalized(location)}`,
        },
        data: {
          userId,
          fullName // ✅ required for frontend filtering
        },
        tokens: recipients,
      }

      await admin.messaging().sendEachForMulticast(message)
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
 export const deleteAllImages = async (req, res) => {
  try {
    await Food.deleteMany({}) // Deletes all documents in the Food collection
    res.status(200).json({ message: "All images deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "An error occurred while deleting images" })
  }
}
