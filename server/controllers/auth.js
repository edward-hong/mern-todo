const User = require('../models/user')

exports.signup = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.status(400).json({
        error: 'Email is taken',
      })
    }

    const newUser = new User({ name, email, password })

    newUser
      .save()
      .then(() => {
        res.json({
          message: 'Signup success! Please signin',
        })
      })
      .catch((error) => {
        console.log('SIGNUP ERROR', error)
        return res.status(400).json({
          errror,
        })
      })
  })
}
