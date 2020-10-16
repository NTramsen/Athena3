

import React, {Component, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import '../UserLandingPage.css';
import NavBar from '../NavBar/NavBar';

class Search extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    };
	};

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
	      <div className='search-container'>
			<div className='search-header'>
				<p>Search for an item:</p>
			</div>
			<input className = 'search-form'
				placeholder = 'Enter item name'
				type = 'text'></input>
			<button className = 'search-button btn'>Search</button>
		</div>
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

Search.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Search);