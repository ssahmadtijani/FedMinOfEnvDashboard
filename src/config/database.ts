import { DataTypes, Sequelize, TransactionOptions } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbServer = process.env.DB_SERVER || 'localhost'
const dbUsername = `${process.env.DB_USERNAME}`
const dbPassword = `${process.env.DB_PASSWORD}`
const dbName = `${process.env.DB_NAME}`

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbServer,
    dialect: 'mysql',
    logging: (msg) => console.log(`[SEQUELIZE]: ${msg}`),
    replication: {
        read: [
            {
                host: dbServer,
                username: dbUsername,
                password: dbPassword,
            },
        ],
        write: {
            host: dbServer,
            username: dbUsername,
            password: dbPassword,
        },
    },
})

const sequelizeTr = async (options?: TransactionOptions) => await sequelize.transaction(options)

const closeDatabaseConnections = async () => {
    try {
        await sequelize.close()
        console.log('Database connection closed.')
    } catch (error) {
        console.error('Error closing database connection:', error)
    }
}

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing database connection')
    await closeDatabaseConnections()
    process.exit(0)
})

export { sequelize, DataTypes, sequelizeTr }

export default sequelize
