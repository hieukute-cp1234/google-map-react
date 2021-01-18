import React, { useState } from 'react';
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
import Context from '../context/context'
import { CheckUser, checkLogin } from './checkUser/check'

function AppMap() {
  const PrivateRouter = ({ children, ...rest }) => {
    const isAuthenticated = checkLogin();

    return (
      <Context.Provider>
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
      </Context.Provider>
    )
  }

  return (
    <Context.Provider>
      <Router>
        <div>
          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/infor">
              <FormInfor />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  )
}

export default React.memo(AppMap);