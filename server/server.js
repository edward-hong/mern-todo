const express = require('express')

const authRoutes = require('./routes/auth')

const app = express()

app.use('/api', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})
