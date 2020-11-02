import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute";
import UserLandingPage from "./components/UserLandingPage/UserLandingPage";
import Checkout from './components/UserLandingPage/Checkout/Checkout';
import Dashboard from './components/UserLandingPage/Dashboard/Dashboard';
import Search from './components/UserLandingPage/Search/Search';
import Items from './components/UserLandingPage/Items/Items';
import Account from './components/UserLandingPage/Account/Account';
import Logout from './components/UserLandingPage/Logout/Logout';
import ItemInterface from './components/UserLandingPage/ItemInterface/ItemInterface';
import AdminLandingPage from './components/AdminLandingPage/AdminLandingPage';
import ManageItems from './components/AdminLandingPage/ManageItems/ManageItems';
import ManageUsers from './components/AdminLandingPage/ManageUsers/ManageUsers';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.getItem('jwtToken');
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={UserLandingPage} />
              <PrivateRoute exact path='/checkout' component={Checkout} />
              <PrivateRoute exact path='/search' component={Search} />
              <PrivateRoute exact path='/myitems' component={Items} />
              <PrivateRoute exact path='/myaccount' component={Account} />
              <PrivateRoute exact path='/logout' component={Logout} />
              <PrivateRoute exact path='/item' component={ItemInterface} />
              <AdminRoute exact path='/adminLanding' component={AdminLandingPage} />
              <AdminRoute exact path='/manageItems' component={ManageItems} />
              <AdminRoute exact path='/manageUsers' component={ManageUsers} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
