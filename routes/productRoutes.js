import express from 'express'
import formidable from 'express-formidable'
import {
	createProductController,
	deleteProductController,
	getProductController,
	getSingleProductController,
	productFilterController,
	productPhotoController,
	updateProductController,
} from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @openapi
 * /create-product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Create a new product by admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */

// Create product route
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// Get all products
router.get('/products', getProductController)

// Get single product by slug
router.get('/product/:slug', getSingleProductController)

// Get product photo
router.get('/product-photo/:pid', productPhotoController)

// Update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// Delete product
router.delete('/product/:pid', requireSignIn, isAdmin, deleteProductController)

// Filter products
router.get('/product-filters', productFilterController)

export default router
