import Comment from '../models/comentsModel.js'

// Barcha izohlarni olish
export const getComments = async (req, res) => {
	try {
		const comments = await Comment.find({ productId: req.params.productId })
		res.status(200).json(comments)
	} catch (error) {
		res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
	}
}

// Yangi izoh qo'shish
export const addComment = async (req, res) => {
	try {
		const { user, text } = req.body
		const newComment = new Comment({
			productId: req.params.productId,
			user,
			text,
		})
		const savedComment = await newComment.save()
		res.status(201).json(savedComment)
	} catch (error) {
		res.status(500).json({ message: 'Izoh qo\'shishda xatolik yuz berdi' })
	}
}

// Izohni yangilash
export const updateComment = async (req, res) => {
	try {
		const updatedComment = await Comment.findByIdAndUpdate(
			req.params.commentId,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedComment)
	} catch (error) {
		res.status(500).json({ message: 'Izohni yangilashda xatolik yuz berdi' })
	}
}

// Izohni o'chirish
export const deleteComment = async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.commentId)
		res.status(200).json({ message: 'Izoh muvaffaqiyatli o\'chirildi' })
	} catch (error) {
		res.status(500).json({ message: 'Izohni o\'chirishda xatolik yuz berdi' })
	}
}
