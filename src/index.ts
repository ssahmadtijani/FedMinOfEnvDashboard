import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import helmet from 'helmet'
import { sequelize } from './config/database'

// Import your routes
// import userRoutes from './routes/userRoutes'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(helmet()) // Security headers

// Test database connection
const testDBConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected successfully.')

    } catch (error) {
        console.error('Database connection failed:', error)
        process.exit(1)
    }
}

// Define API Routes
// app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Server is running! Welcome to the API.')
})

//Start the Server
const startServer = async () => {
    await testDBConnection()

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}

startServer()
