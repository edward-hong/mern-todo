import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import Toast from '../Toast'
import useToast from '../hooks/useToast'

const Forgot = () => {
  const [email, setEmail] = useState('')
  const [
    open,
    setOpen,
    severity,
    setSeverity,
    toastMsg,
    setToastMsg,
    handleClose,
  ] = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'PUT',
      url: '/auth/forgot-password',
      data: { email },
    })
      .then((response) => {
        setEmail('')
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
      <Typography
        data-testid="heading"
        align="center"
        variant="h2"
        component="h1"
      >
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              inputProps={{ 'data-testid': 'email' }}
              variant="outlined"
              size="small"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Button
            data-testid="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </Grid>
      </form>
      <Toast
        open={open}
        handleClose={handleClose}
        severity={severity}
        toastMsg={toastMsg}
      />
    </Container>
  )
}

export default Forgot
