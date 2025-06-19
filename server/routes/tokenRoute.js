import express from 'express'
import Token from '../models/token.js'

const router = express.Router()

// Save FCM token
router.post('/save-token', async (req, res) => {
  try {
    const { token, userId } = req.body

    // console.log('📥 Received token:', token)
    // console.log('📥 From user:', userId)

    if (!token) return res.status(400).json({ success: false, error: 'Token is required' })

    await Token.updateOne(
      { token },
      { token, userId },
      { upsert: true, setDefaultsOnInsert: true }
    )

    res.json({ success: true, message: 'Token saved successfully' })
  } catch (err) {
    console.error('❌ Error saving token:', err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router
