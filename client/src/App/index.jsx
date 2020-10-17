import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Signup from '../Signup'
import Signin from '../Signin'
import Navbar from '../Navbar'
import Activate from '../Activate'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/auth/activate/:token" component={Activate} />
    </Switch>
  </BrowserRouter>
)

export default App
