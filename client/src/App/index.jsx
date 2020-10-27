import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from '../PrivateRoute'
import Home from '../Home'
import Signup from '../Signup'
import Signin from '../Signin'
import Navbar from '../Navbar'
import Forgot from '../Forgot'
import Reset from '../Reset'
import Activate from '../Activate'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/auth/password/reset/:token" component={Reset} />
      <Route path="/auth/activate/:token" component={Activate} />
    </Switch>
  </BrowserRouter>
)

export default App
