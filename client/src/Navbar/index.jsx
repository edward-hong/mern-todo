import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { isAuth, signout } from '../utils/helpers'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const history = useHistory()
  const { pathname } = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(isAuth())

  const userInfo = localStorage.getItem('user')

  useEffect(() => {
    userInfo ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, [pathname, userInfo])

  const handleSignout = () => {
    signout(() => {
      setIsLoggedIn(false)
      history.push('/signin')
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.navLink} to="/">
              Todo
            </Link>
          </Typography>

          {isLoggedIn ? (
            <Button color="inherit" onClick={handleSignout}>
              Signout
            </Button>
          ) : (
            <>
              <Button color="inherit">
                <Link className={classes.navLink} to="/signup">
                  Signup
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.navLink} to="/signin">
                  Signin
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
