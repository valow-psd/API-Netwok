const cors = require("cors");
const express = require("express");
const users_routes = require("./src/users/routes")
const restaurants_routes = require("./src/restaurants/routes")
require("dotenv").config()

const {launchMongoDB}= require("./database/connection")

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT
console.log(PORT)


const app = express()


app.use(express.json())

app.use(cors({
    origin: [ORIGIN],
}))
app.use("/api/",restaurants_routes)
app.use("/api/", users_routes)

app.listen(PORT, async () =>{
    console.log(`http://localhost:${PORT}/api/`)
    await launchMongoDB()
} )