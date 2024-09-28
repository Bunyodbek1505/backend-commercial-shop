import express from 'express'
import { forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

// Router object
const router = express.Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Toshmat
 *         email:
 *           type: string
 *           example: toshmat@gmail.com
 *         password:
 *           type: string
 *           example: stringPassword1234
 *         phone:
 *           type: string
 *           example: 900090099
 *         address:
 *           type: string
 *           example: T.Shaxar
 *         answer:
 *           type: string
 *           example: Key
 *         
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 12345abc
 *         name:
 *           type: string
 *           example: Toshmat
 *         email:
 *           type: string
 *           example: toshmat@gmail.com
 *         password:
 *           type: string
 *           example: stringPassword1234
 *         phone:
 *           type: string
 *           example: 900090099
 *         address:
 *           type: string
 *           example: T.Shaxar
 *         answer:
 *           type: string
 *           example: Key
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: toshmat@example.com
 *         password:
 *           type: string
 *           example: Password1234
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 12345abc
 *         email:
 *           type: string
 *           example: toshmat@example.com
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Yangi foydalanuvchini ro'yhatdan o'tkazing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200:
 *         description: user muvaffaqiyatli ro'yhatdan o'tdi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: so'rov nato'g'ri yokida noto'g'ri malumot
 *       409:
 *         description: Bunday foydalanuvchi mavjud
 */
router.post('/register', registerController)

/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Foydalanuvchiga kirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: \Muvaffaqiyatli bajarildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Malumot yaraqsiz
 */
router.post('/login', loginController)

/**
 * @openapi
 * '/forgot-password':
 *  post:
 *     tags:
 *     - User
 *     summary: Parolni unutdingizmi!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: toshmat@example.com
 *               answer:
 *                 type: string
 *                 example: Key
 *               newPassword:
 *                 type: string
 *                 example: newPassword1234
 *     responses:
 *       200:
 *         description: Parol muvaffaqiyatli tiklandi
 *       404:
 *         description: Foydalanuvchi topilmadi
 */
router.post('/forgot-password', forgotPasswordController)


router.get('/test', requireSignIn, isAdmin, testController)

/**
 * @openapi
 * '/user-auth':
 *  get:
 *     tags:
 *     - User
 *     summary: Himoyalangan foydalanuvchi route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli autentifikatsiya qilindi
 *       403:
 *         description: Ruxsatsiz kirish
 */
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})


/**
 * @openapi
 * '/admin-auth':
 *  get:
 *     tags:
 *     - Admin
 *     summary: Himoyalangan admin route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin autentifikatsiyasi muvaffaqiyatli amalga oshirildi
 *       403:
 *         description: Ruxsatsiz kirish
 */
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})

export default router
