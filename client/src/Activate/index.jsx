import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const Activate = ({ match }) => {
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [severity, setSeverity] = useState('success')
  const [open, setOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    setToken(match.params.token)
    setName(jwt.decode(match.params.token).name)
  }, [match.params.token])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_AUTH}/activation`,
      data: { token },
    })
      .then((response) => {
        console.log(('ACCOUNT ACTIVATION SUCCESS', response))
        setSeverity('success')
        setToastMsg(response.data.message)
        setOpen(true)
      })
      .catch((error) => {
        console.error('ACCOUNT ACTIVATION ERROR', error.response.data.error)
        setSeverity('error')
        setToastMsg(error.response.data.error)
        setOpen(true)
      })
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h5" component="h1">
        Hey {name}, ready to activate your account?
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Activate
      </Button>
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

export default Activate
