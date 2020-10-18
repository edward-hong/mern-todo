import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import { isAuth } from '../utils/helpers'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_AUTH}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log(('SIGNUP SUCCESS', response))
        setName('')
        setEmail('')
        setPassword('')
        setSeverity('success')
        setToastMsg(response.data.message)
        setOpen(true)
      })
      .catch((error) => {
        console.error('SIGNUP ERROR', error.response.data)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" component="h1">
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              size="small"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Signup
          </Button>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
      {isAuth() ? <Redirect to="/" /> : null}
    </Container>
  )
}

export default Signup
