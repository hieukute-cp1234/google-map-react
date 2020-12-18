import React from 'react';
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

export default function AppMap() {

  const PrivateRouter = ({ children, ...rest }) => {
    const isAuthenticated = '123456';
    console.log({children})
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />) : children
        }
      />
    )
  }

  return (
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
  )
}