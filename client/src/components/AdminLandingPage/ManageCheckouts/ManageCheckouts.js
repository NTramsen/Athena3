import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios';
import '../../../App.css';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/users'
})

class ManageCheckouts extends Component {

  state = {
    users: [],
  };

  constructor(props){
    super(props);
  };

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  componentDidMount(){
    this.findAllCheckouts();
  };

  findAllCheckouts = async() => {
    let data = await api.get('/').then( ({data}) => data);
    this.setState({users : data});
  };

  returnItem = async(userid, itemid) =>{
    return null;
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
				<div className='component-header'>
        <p className='component-title'>Manage Checkout</p>
        </div>
        <div>
            <span>View currently checked-out items:</span>
            <p>To be implemented.</p>
          </div>
          <div>
            <span>View over-due items:</span>
            {this.state.users.map(user =>
              <div key={user._id}>
                {user.items.map(item=>
                  <div key={item}>
                    {user.name}
                    {user._id}
                    {item}
                    <button onClick={()=>this.returnItem(user._id, item._id)}>Return item</button>
                  </div>
                )}
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

ManageCheckouts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageCheckouts);
