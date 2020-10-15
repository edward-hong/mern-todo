const express = require('express')

const app = express()

app.get('/api/signup', (req, res) => {
  res.json({
    data: 'You hit signup endpoint',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`)
})
