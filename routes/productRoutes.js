import express from 'express'
import formidable from 'express-formidable'
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFilterController, productPhotoController, updateProductController } from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'



const router = express.Router()

/**
 * @openapi
 * '/create-product:
 *  post:
 * 		tags:
 * 			- Create Product
 * 			summary: 
 * 	
 */

// routes 
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

// get products
router.get('/get-product', getProductController)

// single product
router.get('/get-product/:slug', getSingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController);

// update product
router.put(
	"/update-product/:pid",
	requireSignIn,
	isAdmin,
	formidable(),
	updateProductController
)

// delete product
router.delete('/product/:pid', deleteProductController)

// filter product
router.get('/product-filters', productFilterController)


export default router