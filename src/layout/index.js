import React, { useState } from 'react'
import Infor from './page/infor'
import Registration from './page/registration'
import Home from './page/home'
import FormInfor from './page/form-infor'
import Login from './page/login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebaseData from '../service/firebaseAPI'

function AppMap() {
  const PrivateRouter = ({ children, ...rest }) => {
    const isAuthenticated = firebaseData.email();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (children) : (<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />)
        }
      />

    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRouter path='/infor'>
            <Infor />
          </PrivateRouter>
          <Route path="/registration">
            <Registration />
          </Route>
          <PrivateRouter path="/form-infor">
            <FormInfor />
          </PrivateRouter>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default React.memo(AppMap);