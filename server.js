import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import commentRoutes from './routes/comentsRoute.js'
import productRoutes from './routes/productRoutes.js'
import swaggerDocs from './swagger.js'

// ENV sozlang
dotenv.config()

// Ma'lumotlar bazasi konfiguratsiyasi
connectDB()

// REST object
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/comments', commentRoutes) // Commentlar marshruti

// REST API
app.get('/', (req, res) => {
  res.send('<h1>Fulstack loyihasiga xush kelibsiz</h1>')
})

// PORT
const PORT = process.env.PORT || 3000

// Listen
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`)
  swaggerDocs(app, PORT)
})
