import React, {Component, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUserInfo } from "../../../actions/authActions";
import '../AdminLandingPage.css';
import AdminBar from '../AdminBar/AdminBar';

class AdminAccount extends Component {

	state = {
		edit: false,
		reAuth: false,
		errors: ""
	}

	constructor(props) {
		super(props);
		this.state = {
		};
	};


	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	editDetails = ()=>{
		this.setState({
			edit: true
		});
	}

	reAuthenticate = ()=>{
		this.setState(
		{
			edit: false,
			reAuth: true
		});
	}

	updatePassword = ()=>{
		this.setState({
			reAuth: false
		});
	}

	updateEmail = ()=>{
		this.setState({
			reAuth: false
		});
	}

  render() {

	const user = this.props.usr.user;
	const info = Object.values(user);

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome {info[1]}</h1>
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
	      <div className='account-container'>
			<div className = 'account-header'>
				<h2>Your account details</h2>
			</div>
			<div className = 'account-content'>
				<ul className='account-info-list'>
					<li><span>{info[1]}</span></li>
					<li><span>{info[2]}</span></li>
				</ul>
			</div>
			<div className = 'edit-account'>
				<button type='button'
					onClick={this.editDetails}
				>Edit account details</button>
				{this.state.edit ?
					<div className="dropdown">
			            <form noValidate onSubmit={this.onSubmit}>
			              <div>
			                <label>Password:</label>
			                <input
			                  id="password1"
			                  type="text"
			                />
			                <label>Re-enter password:</label>
			                <input
			                  id="password2"
			                  type="text"
			                />
			                <button
			                    onClick={this.reAuthenticate}
			                  >
			                  Submit
			                </button>
			              </div>
			            </form>
			            {this.state.errors}
					</div>
					: null
				}
				{this.state.reAuth ?
					<div className="dropdown">
						<span>Update password</span>
			            <form noValidate>
			              <div>
			                <label>New password:</label>
			                <input
			                  id="new_password1"
			                  type="text"
			                />
			                <label>Re-enter new password:</label>
			                <input
			                  id="new_password2"
			                  type="text"
			                />
			                <button
			                    onClick={this.updatePassword}
			                  >
			                  Submit
			                </button>
			              </div>
			            </form>
			            {this.state.errors}
			            <span>Update email address</span>
			            <form noValidate>
			              <div>
			                <label>New email:</label>
			                <input
			                  id="new_email"
			                  type="text"
			                />
			                <button
			                    onClick={this.updateEmail}
			                  >
			                  Submit
			                </button>
			              </div>
			            </form>
			            {this.state.errors}
					</div>
					: null
				}
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

AdminAccount.propTypes = {
  logoutUser: PropTypes.func.isRequired,
	usr: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AdminAccount);
