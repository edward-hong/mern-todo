import React from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const Toast = ({ open, handleClose, severity, toastMsg }) => (
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
)

export default Toast
