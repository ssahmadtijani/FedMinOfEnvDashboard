import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import { sequelize } from './config/database'
import routes from "./routes"
import passport from 'passport'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(cors())
app.use(helmet())

app.use("/api", routes)

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
