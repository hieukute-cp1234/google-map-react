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
import firebase from '../firebase/config'

function AppMap() {

  const PrivateRouter = ({ children, ...rest }) => {
    const isAuthenticated = () => {
      const user = firebase.auth().currentUser;
      console.log(user)
      if (user.email) {
        return true;
      }
      return false;
    }

    console.log({ children })
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? children : (<Redirect
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
          <Route path="/registration">
            <Registration />
          </Route>
          <PrivateRouter path="/infor">
            <FormInfor />
          </PrivateRouter>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRouter path="/">
            <Home />
          </PrivateRouter>
        </Switch>
      </div>
    </Router>
  )
}

export default React.memo(AppMap);