import React, {Component, useState} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUserInfo } from "../../../actions/authActions";
// import '../AdminLandingPage.css';
import '../../../App.css';
import AdminBar from '../AdminBar/AdminBar';

class AdminAccount extends Component {

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
				<button className='account-button'>Edit details</button>
				<button className='account-button'>Change password</button>
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
