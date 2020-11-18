import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/items'
})

class ManageCheckouts extends Component {

  state = {
    items: [],
    seen:-1,
    errors: ""
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
    // to be implemented
    return null;
  };

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
          <h1>Welcome {info[1]}</h1>
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
	          <div className='checkout-container'>
				<div className='checkout-header'>

          <div>
            <span>View currently checked-out items:</span>
            <p>To be implemented.</p>
          </div>
          <div>
            <span>View over-due items:</span>
            <p>To be implemented.</p>
          </div>
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
