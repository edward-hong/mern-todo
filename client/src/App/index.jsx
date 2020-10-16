import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Signup from '../Signup'
import Signin from '../Signin'
import Navbar from '../Navbar'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
    </Switch>
  </BrowserRouter>
)

export default App
