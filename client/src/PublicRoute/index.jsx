import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isAuth } from '../utils/helpers'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
)

export default PrivateRoute
