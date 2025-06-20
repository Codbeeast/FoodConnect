import User from '../models/user.js'

export const postUser=async (req, res) => {
  const { name, email } = req.body
  console.log("helloooo")

  try {
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ name, email })
      
      return res.status(201).json({ message: 'User created', user })
    }

    res.status(200).json({ message: 'User already exists', user })

  } catch (err) {
    
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}