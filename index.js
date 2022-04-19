// imports
const express = require('express')
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./routes/authRouter')
const studentRouter = require('./routes/studentRouter')

// config
const app = express()
const port = 8000

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/auth', authRouter)
app.use('/students', studentRouter)

// listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
