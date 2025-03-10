import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
import prodcutRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Server is running...')
})
app.use('/api/products', prodcutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//upload文件夹作为静态文件
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is${process.env.NODE_ENV}mode${PORT}running`.yellow.bold
  )
)