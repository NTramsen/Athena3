import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import '../../../App.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users'
})

class ManageUsers extends Component {

  state = {
    users: [],
    seen:-1
  };

	constructor(props) {
	    super(props);
	};

  componentDidMount(){
    this.findAllUsers();
  }

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  findAllUsers = async() => {
    let data = await api.get('/').then( ({data}) => data);
    this.setState({users : data});
  }

  createUser = async () => {
    return null;
  }

  deleteUser = async(id)=>{
    let data = await api.delete(`/${id}`);
    this.findAllUsers();
  }

  togglePop = (item_id) => {
    if(this.state.seen==item_id){
      this.setState({
        seen: -1
      });
    }
    else{
      this.setState({
        seen: item_id
      });
    }
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
				<div className='component-header'>
          <p className='component-title'>Manage Users:</p>
				</div>
        <div className = 'User-List'>
          {this.state.users.map(user =>
            <div key={user._id}>
              {user.name}
              {user.email})
              <button className='item-button_btn' onClick={() => this.deleteUser(user._id)}>delete</button>
              <button className='item-button_btn' onClick={()=>this.togglePop(user._id)}>More</button>
              {this.state.seen==user._id ?
                <div className="dropdown">
                  <span className="dashboard-item_description">{user._id}</span>
                  <span>Map over user's items.</span>
                </div>
                : null}
            </div>
          )}
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

ManageUsers.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageUsers);
