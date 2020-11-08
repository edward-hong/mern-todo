import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import jwt from 'jsonwebtoken'
import axios from 'axios'

import Toast from '../Toast'
import useToast from '../hooks/useToast'

const Activate = ({ match }) => {
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [
    open,
    setOpen,
    severity,
    setSeverity,
    toastMsg,
    setToastMsg,
    handleClose,
  ] = useToast()

  useEffect(() => {
    setToken(match.params.token)
    setName(jwt.decode(match.params.token).name)
  }, [match.params.token])

  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: '/auth/activation',
      data: { token },
    })
      .then((response) => {
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
      <Toast
        open={open}
        handleClose={handleClose}
        severity={severity}
        toastMsg={toastMsg}
      />
    </Container>
  )
}

export default Activate
