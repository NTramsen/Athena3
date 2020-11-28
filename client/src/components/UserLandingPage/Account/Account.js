import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import '../../../App.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';



const api = axios.create({
  baseURL: 'http://localhost:5000/api/users'
})

class Account extends Component {

	constructor(props) {
		super(props);
		this.state = {
			changePassword: false,
			changeEmail: false,
			errors: "",
			password: "",
			newPassword: "",
			newPassword2: ""
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


	onSubmit = e => {
		e.preventDefault();
	};

	updatePassword =  () =>{
		const user = this.props.usr.user;
		const info = Object.values(user);

		const userData = {
			email: info[2],
			password: this.state.password,
			newPassword: this.state.newPassword,
			newPassword2: this.state.newPassword2
		}

		let data = api.put('/change_pass', userData).then( response => {
			console.log(response);
			this.setState({
				changePassword: false,
				changeEmail: false
			});
		}).catch(err => {
			const code = err.response.data;
			const message = Object.values(code)[0];
			this.setState({errors: message});
		});

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
          <NavBar/>
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
			            <form noValidate onSubmit={this.onSubmit}>
			              <div>
			                <label>Enter password:</label>
			                <input
			                  id="password"
			                  type="password"
												value = {this.state.password}
												// error= {errors.password}
												onChange={(e)=>this.setState({password: e.target.value})}></input>
										</div>
										<div>
			                <label>Enter new password:</label>
			                <input
			                  id="new_pass"
			                  type="password"
												value = {this.state.newPassword}
												// error= {errors.newPassword}
												onChange={(e)=>this.setState({newPassword: e.target.value})}></input>
										</div>
										<div>
			                <label>Re-enter new password:</label>
			                <input
			                  id="new_pass2"
			                  type="password"
												value = {this.state.newPassword2}
												// error= {errors.newPassword2}
												onChange={(e)=>this.setState({newPassword2: e.target.value})}></input>
			              </div>
										<div>
			                <button type= "submit" className='account-button'
			                    onClick={this.updatePassword}
			                  >
			                  Submit
			                </button>
			              </div>
			            </form>
									<span className="red-text">
										{this.state.errors}
									</span>
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

Account.propTypes = {
  logoutUser: PropTypes.func.isRequired,
	usr: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	usr: state.auth,
	errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Account);
