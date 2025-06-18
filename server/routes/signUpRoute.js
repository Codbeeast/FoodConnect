import express from 'express'
import User from '../models/signUpUser.js'

const router = express.Router()

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists. Please log in.' })
    }

    const newUser = await User.create({ name, email, password })
    return res.status(201).json({ message: 'User created successfully.', user: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Signup failed.', error: error.message })
  }
})

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'No account found. Please sign up first.' })
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password.' })
    }

    return res.status(200).json({ message: 'Login successful.', user })
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message })
  }
})

export default router
