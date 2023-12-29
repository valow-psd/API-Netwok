const mongoose = require("mongoose")
require("dotenv").config()

const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

async function launchMongoDB() {
    try {
        await mongoose.connect(`${DB_URL}${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
    }
    catch(err) {
        console.log(`Failed to connect to MongoDB : ${err.message}`)
    }
}

async function stopMongoDB() {
    try {
        await mongoose.disconnect()
        console.log('Database connection closed')
    }
    catch(err) {
        console.log(`Failed to close connection to database : ${err.message}`)
    }
}

module.exports = { launchMongoDB, stopMongoDB }
