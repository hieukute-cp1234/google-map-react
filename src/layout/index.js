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
            <Route path='/infor'>
              <Infor/>
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/form-infor">
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