//packages and modules import
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const createRouter = require("./routes");
require('dotenv').config()

const app=express()
const PORT=process.env.PORT

//Middleware plugins
app.use(cors())
app.use(express.json())

//DB connection
mongoose.connect(process.env.MONGO_URI)

//routes
const router = createRouter();
app.use("/api", router);

//server execution
app.listen(PORT, ()=>{
    console.log(`Server is started on http://localhost:${PORT}`)
})