import React, {Component, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import '../UserLandingPage.css';
import NavBar from '../NavBar/NavBar';

class Account extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    };
	};

	getAccountInfo(){
		return [
			{
				username: "Neil Tramsen",
			},
			{
				email_address: "ntramsen112@gmail.com",
			}
		];
	}

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
	      <div className='account-container'>
			<div className = 'account-header'>
				<h2>Your account details</h2>
			</div>
			<div className = 'account-content'>
				<ul className='account-info-list'>
					{this.getAccountInfo().map((info, index)=>{
						return(
							<li key={info} className="account-info-list-element">
								<span>{info.username}</span>
								<span>{info.email_address}</span>
							</li>
						)
					})}
				</ul>
			</div>                
			<div className = 'edit-account'>
				<button type='button'>Edit details</button>
				<button type='button'>Change password</button>
			</div>
		</div>
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

Account.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Account);