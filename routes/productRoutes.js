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
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/v1/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             quantity:
 *               type: number
 *             photo:
 *               type: string
 *               format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Error in creating product
 */
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

/**
 * @swagger
 * /api/v1/product/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully fetched products
 *       500:
 *         description: Error in getting products
 */
router.get('/products', getProductController)

/**
 * @swagger
 * /api/v1/product/product/{slug}:
 *   get:
 *     summary: Get a single product by slug
 *     tags: [Products]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: Slug of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched single product
 *       500:
 *         description: Error while getting single product
 */
router.get('/product/:slug', getSingleProductController)

/**
 * @swagger
 * /api/v1/product/product-photo/{pid}:
 *   get:
 *     summary: Get product photo
 *     tags: [Products]
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched product photo
 *       500:
 *         description: Error while getting photo
 */
router.get('/product-photo/:pid', productPhotoController)

/**
 * @swagger
 * /api/v1/product/update-product/{pid}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       multipart/form-data:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *             category:
 *               type: string
 *             quantity:
 *               type: number
 *             photo:
 *               type: string
 *               format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       500:
 *         description: Error in updating product
 */
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

/**
 * @swagger
 * /api/v1/product/product/{pid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pid
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Error while deleting product
 */
router.delete('/product/:pid', requireSignIn, isAdmin, deleteProductController)

/**
 * @swagger
 * /api/v1/product/product-filters:
 *   get:
 *     summary: Filter products
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checked:
 *                 type: array
 *                 items:
 *                   type: string
 *               radio:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Successfully filtered products
 *       400:
 *         description: Error while filtering products
 */
router.get('/product-filters', productFilterController)

export default router
