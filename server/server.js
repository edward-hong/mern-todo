require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')

const app = express()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(`DB connection error: ${err.message}`))

app.use(morgan('dev'))
app.use(express.json())

if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: process.env.CLIENT_URL }))
}

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})
