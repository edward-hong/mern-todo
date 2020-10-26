import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import axios from 'axios'

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_AUTH}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        setEmail('')
        setSeverity('success')
        setToastMsg(response.data.message)
        setOpen(true)
      })
      .catch((error) => {
        console.error('FORGOT PASSWORD ERROR', error.response.data)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" component="h1">
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Reset Password
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
    </Container>
  )
}

export default Forgot
