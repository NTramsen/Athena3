import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, setCurrentAdmin, logoutUser } from "./actions/authActions";
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
// import Dashboard from './components/UserLandingPage/Dashboard/Dashboard';
import Search from './components/UserLandingPage/Search/Search';
import Items from './components/UserLandingPage/Items/Items';
import Account from './components/UserLandingPage/Account/Account';
import Logout from './components/UserLandingPage/Logout/Logout';
import AdminLandingPage from './components/AdminLandingPage/AdminLandingPage';
import ManageItems from './components/AdminLandingPage/ManageItems/ManageItems';
import ManageUsers from './components/AdminLandingPage/ManageUsers/ManageUsers';
import ManageCheckouts from './components/AdminLandingPage/ManageCheckouts/ManageCheckouts';
import AdminAccount from './components/AdminLandingPage/AdminAccount/AdminAccount';

import "./App.css";




  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;

    // Set auth token header auth
    setAuthToken(token);

    const user = {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email
    };

    if (localStorage.admin==="true"){
      store.dispatch(setCurrentAdmin(user));
    } else if (localStorage.admin==="false"){
      store.dispatch(setCurrentUser(user));
    }


    //validate auth token time
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
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
              <AdminRoute exact path='/adminLanding' component={AdminLandingPage} />
              <AdminRoute exact path='/manageItems' component={ManageItems} />
              <AdminRoute exact path='/manageUsers' component={ManageUsers} />
              <AdminRoute exact path='/manageCheckouts' component={ManageCheckouts} />
              <AdminRoute exact path='/AdminAccount' component={AdminAccount} />

            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
