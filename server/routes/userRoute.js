// routes/user.js
import express from 'express'
import User from '../models/user.js'

const router = express.Router()

router.post('/users', async (req, res) => {
  const { name, email } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({ name, email})
      return res.status(201).json({ message: 'User created', user })
    }

    res.status(200).json({ message: 'User already exists', user })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
