import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import './ManageUsers.css';

class ManageUsers extends Component {

	constructor(props) {
	    super(props);
	};

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
    //const { user } = this.props.auth;
    const getCurrentUsers = ()=>{
      return [
         {
          Name: "Student A",
          Email_address: "studenta@emory.edu",
          Student_ID: 123456
        },
        {
          Name: "Student B",
          Email_address: "studentb@emory.edu",
          Student_ID: 223456
        },
        {
          Name: "Student C",
          Email_address: "studentc@emory.edu",
          Student_ID: 323456
        }
      ];
    }
    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome Neil Tramsen</h1>
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
	          <div className='checkout-container'>
				<div className='checkout-header'>
					<p>Manage Users</p>
				</div>
          <div className = 'User-List'>
          <ul>
            {getCurrentUsers().map((user, index)=>{
              return(
                <li key={index}>
                  <div className = "userlist-element">
                    <span>{user.Name}</span>
                    <span>{user.Email_address}</span>
                    <span>{user.Student_ID}</span>
                    <button className = 'remove_btn'>Remove</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

			</div>
      
        <input className = 'adduser-form'
            placeholder = 'Enter User name'
            type = 'text'></input>
        <input className = 'adduser-form'
            placeholder = 'Enter User email'
            type = 'text'></input>
        <input className = 'adduser-form'
            placeholder = 'Enter User ID'
            type = 'text'></input>

          <button className = 'checkout-button-btn'>Add User</button>

        
        
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

ManageUsers.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageUsers);