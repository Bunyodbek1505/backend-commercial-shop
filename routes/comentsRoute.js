import express from 'express'
import {
	addComment,
	deleteComment,
	getComments,
	updateComment,
} from '../controllers/comentsController.js'

const router = express.Router()

// Barcha izohlarni olish
router.get('/product/:productId', getComments)

// Yangi izoh qo'shish
router.post('/product/:productId', addComment)

// Izohni yangilash
router.patch('/:commentId', updateComment)

// Izohni o'chirish
router.delete('/:commentId', deleteComment)

export default router
