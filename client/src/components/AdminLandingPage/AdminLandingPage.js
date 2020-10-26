import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AdminBar from './AdminBar/AdminBar';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import './AdminLandingPage.css';

class AdminLandingPage extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    //const { user } = this.props.auth;

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome admin user</h1>
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
          <AdminDashboard />
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

AdminLandingPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminLandingPage);