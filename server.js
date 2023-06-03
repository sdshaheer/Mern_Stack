const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./DataBase/db')
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require('./routes/blogRoutes')

// env configuration
dotenv.config()

// connect to database
connectDB()

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/blogs',blogRoutes)

const PORT = process.env.PORT || 8080
app.listen(8080,()=>{
    console.log(`server started at port ${PORT}`)
})