import express from 'express'
import { postUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/users',postUser )

export default router
