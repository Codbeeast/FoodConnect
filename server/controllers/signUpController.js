import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/signUpUser.js'

const JWT_SECRET = process.env.JWT_SECRET

export const signUp = async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists. Please log in.' })
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: hashedPassword })

    return res.status(201).json({ message: 'User created successfully.', user: { name, email } })
  } catch (error) {
    res.status(500).json({ message: 'Signup failed.', error: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'No account found. Please sign up first.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid password.' })

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2d' })
    const decoded = jwt.decode(token)
console.log('Issued token expires at:', new Date(decoded.exp * 1000).toLocaleString())

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message })
  }
}