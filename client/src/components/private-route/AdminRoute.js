import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAdmin && auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : auth.isAuthenticated === true ? (
        <Redirect to="/dashboard" />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
