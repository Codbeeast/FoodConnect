import express from 'express'
import multer from 'multer'
import { postFoodImage,getFoodImage,deleteAllImages } from '../controllers/foodController.js'

const router = express.Router()
const upload = multer({ dest: 'temp/' })

router.post('/data',upload.single('image'),postFoodImage)
router.get('/foodData',getFoodImage )
router.delete('/delete',deleteAllImages )
export default router
