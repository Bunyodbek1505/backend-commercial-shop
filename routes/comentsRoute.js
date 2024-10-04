import express from 'express'
import {
	addComment,
	deleteComment,
	getComments,
	updateComment,
} from '../controllers/comentsController.js'

const router = express.Router()

/**
 * @swagger
 * /api/v1/comments/product/{productId}:
 *   get:
 *     summary: Get all comments for a specific product
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   productId:
 *                     type: string
 *                   user:
 *                     type: string
 *                   text:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/product/:productId', getComments)

/**
 * @swagger
 * /api/v1/comments/product/{productId}:
 *   post:
 *     summary: Add a new comment to a specific product
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 example: "John Doe"
 *               text:
 *                 type: string
 *                 example: "This is a great product!"
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 productId:
 *                   type: string
 *                 user:
 *                   type: string
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Error adding comment
 */
router.post('/product/:productId', addComment)

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated comment text"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 productId:
 *                   type: string
 *                 user:
 *                   type: string
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *       500:
 *         description: Error updating comment
 */
router.patch('/:commentId', updateComment)

/**
 * @swagger
 * /api/v1/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       500:
 *         description: Error deleting comment
 */
router.delete('/:commentId', deleteComment)

export default router
