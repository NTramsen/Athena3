import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import './ManageUsers.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users'
})

class ManageUsers extends Component {

  state = {
    users: []
  };

	constructor(props) {
	    super(props);
	};

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  findAllUsers = async() => {
    let data = await api.get('/').then( ({data}) => data);
    this.setState({users : data});
  }

  deleteUser = ()=>{
    return null;
  }

  render() {
    
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
          {this.state.users.map(user => <h2 key={user.name}>{user.email})
          <button onClick={() => this.deleteUser(user.type)}>delete</button></h2>)}
          <button onClick = {this.findAllUsers}>findAllUsers</button>
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