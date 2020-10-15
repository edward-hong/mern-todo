require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: process.env.CLIENT_URL }))
}

app.use('/api', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})
