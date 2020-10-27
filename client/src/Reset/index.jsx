import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const Reset = () => {
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const urlToken = useParams().token

  useEffect(() => {
    if (urlToken) {
      setToken(urlToken)
    }
  }, [urlToken])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(token)
    axios({
      method: 'PUT',
      url: '/auth/reset-password',
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        setNewPassword('')
        setSeverity('success')
        setToastMsg(response.data.message)
        setOpen(true)
      })
      .catch((error) => {
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" component="h1">
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              size="small"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Set New Password
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

export default Reset
