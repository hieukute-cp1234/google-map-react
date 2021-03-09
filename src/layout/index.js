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
import firebase from '../firebase/config'
import firebaseData from '../service/firebaseAPI'

function AppMap() {
  const PrivateRouter = ({ children, ...rest }) => {
    const isAuthenticated = async () => {
      const response2 = await firebaseData.Email();
      if(response2 != null && response2 != undefined){
        return true
      } else {
        return false
      }
    };

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />) : (children)
        }
      />

    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/infor'>
            <Infor />
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
  )
}

export default React.memo(AppMap);