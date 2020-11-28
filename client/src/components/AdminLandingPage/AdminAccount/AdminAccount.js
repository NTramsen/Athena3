import React, {Component, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUserInfo } from "../../../actions/authActions";
// import '../AdminLandingPage.css';
import '../../../App.css';
import AdminBar from '../AdminBar/AdminBar';

class AdminAccount extends Component {

	state = {
		changePassword: false,
		changeEmail: false,
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

	editPassword = ()=>{
		this.setState({
			changePassword: true,
			changeEmail: false
		});
	}

	editEmail = ()=>{
		this.setState({
			changePassword: false,
			changeEmail: true
		});
	}

	updatePassword = ()=>{
		// make api calls

		// if success:
		this.setState({
			changePassword: false,
			changeEmail: false
		});
		// display success - can put it in state.errors

		// else display error in state.errors
	}

	updateEmail = ()=>{

		// make api calls

		// if success:
		this.setState({
			changePassword: false,
			changeEmail: false
		});

		// display success - can put it in state.errors

		// else display error in state.errors
	}

  render() {

	const user = this.props.usr.user;
	const info = Object.values(user);

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
			Welcome {info[1]}
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
	      <div className='component-container'>
			<div className = 'component-header'>
				<p className='component-title'>Your account details</p>
			</div>
			<div className = 'account-content'>
				<ul className='account-info-list'>
					<li><span>{info[1]}</span></li>
					<li><span>{info[2]}</span></li>
				</ul>
			</div>
			<div className = 'edit-account'>
				<button className='account-button' type='button'
					onClick={this.editPassword}
				>Edit password</button>
				<button className='account-button' type='button'
					onClick={this.editEmail}
				>Edit email</button>

				{this.state.changePassword ?
					<div className="dropdown">
			            <form noValidate>
			              <div>
			                <label>Enter password:</label>
			                <input
			                  id="password"
			                  type="password"
			                />
			                <label>Enter new password:</label>
			                <input
			                  id="new_pass"
			                  type="password"
			                />
			                <label>Re-enter new password:</label>
			                <input
			                  id="new_pass2"
			                  type="password"
			                />
			                <button className='account-button'
			                    onClick={this.updatePassword}
			                  >
			                  Submit
			                </button>
			              </div>
			            </form>
			            {this.state.errors}
					</div>
					: null
				}

				{this.state.changeEmail ?
					<div className="dropdown">
			            <form noValidate>
			              <div>
			                <label>Enter password:</label>
			                <input
			                  id="password"
			                  type="password"
			                />
			                <label>Enter your new email:</label>
			                <input
			                  id="new_email"
			                  type="text"
			                />
			                <button className='account-button'
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
