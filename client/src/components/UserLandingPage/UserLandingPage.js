
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './UserLandingPage.css';
import Checkout from './Checkout/Checkout';
import NavBar from './NavBar/NavBar';
import Dashboard from './Dashboard/Dashboard';
import Search from './Search/Search';
import Items from './Items/Items';
import Account from './Account/Account';
import Logout from './Logout/Logout';
import ItemInterface from './ItemInterface/ItemInterface';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class UserLandingPage extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome Neil Tramsen</h1>
        </div>
        <div className = 'navbar'>
          <NavBar/>
        </div>
        <div className = 'content'>
          <Dashboard />
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

UserLandingPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserLandingPage);
