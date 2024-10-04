import express from 'express'
import {
	categoryController,
	createCategoryController,
	deleteCategoryController,
	singleCategoryController,
	updateCategoryController
} from '../controllers/categoryController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/v1/category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: New category created
 *       401:
 *         description: Name is required
 *       200:
 *         description: Category Already Exists
 *       500:
 *         description: Error in Category
 */
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

/**
 * @swagger
 * /api/v1/category/update-category/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *                 example: Home Appliances
 *     responses:
 *       200:
 *         description: Category Updated Successfully
 *       500:
 *         description: Error while updating category
 */
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

/**
 * @swagger
 * /api/v1/category/get-category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: All Categories List
 *       500:
 *         description: Error while getting all categories
 */
router.get('/get-category', categoryController)

/**
 * @swagger
 * /api/v1/category/single-category/{slug}:
 *   get:
 *     summary: Get a single category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: The slug of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get Single Category Successfully
 *       500:
 *         description: Error While getting Single Category
 */
router.get('/single-category/:slug', singleCategoryController)

/**
 * @swagger
 * /api/v1/category/delete-category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category delete successfully
 *       500:
 *         description: Error in delete category
 */
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router
