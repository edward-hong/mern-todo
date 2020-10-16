const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')

const User = require('../models/user')

// exports.signup = (req, res) => {
//   const { name, email, password } = req.body

//   User.findOne({ email }).then((foundUser) => {
//     if (foundUser) {
//       return res.status(400).json({
//         error: 'Email is taken',
//       })
//     }

//     const newUser = new User({ name, email, password })

//     newUser
//       .save()
//       .then(() => {
//         res.json({
//           message: 'Signup success! Please signin',
//         })
//       })
//       .catch((error) => {
//         console.log('SIGNUP ERROR', error)
//         return res.status(400).json({
//           errror,
//         })
//       })
//   })
// }

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.signup = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.status(400).json({
        error: 'Email is taken',
      })
    }
  })

  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: '10m' },
  )

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Account activation link',
    html: `
      <h1>Please use the following link to activate your account</h1>
      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
      <hr />
      <p>This email may contain sensitive information</p>
      <p>${process.env.CLIENT_URL}</p>
    `,
  }

  sgMail
    .send(emailData)
    .then((sent) => {
      return res.json({
        message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
      })
    })
    .catch((err) => {
      console.log('SIGNUP EMAIL SENT ERROR', err)
      return res.json({
        message: err.message,
      })
    })
}
