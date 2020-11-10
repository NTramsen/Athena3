import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/items'
})

class ManageItems extends Component {

  state = {
    items: [],
    seen:-1
  };

  constructor(props){
    super(props);
  };

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  findAllItems = async() => {
    let data = await api.get('/').then( ({data}) => data);
    this.setState({items : data});
  }

  createItem = async () => {
    let res = await api.post('/',{
      type: 'newItem',
      description: 'this is a new item',
      borrowed: false
    });
    this.findAllItems();
  }

  deleteItem = async(id) =>{
    let data = await api.delete(`/${id}`);
    this.findAllItems();
  }  

  togglePop = (item_id) => {
      this.setState({
        seen: item_id
      });
  };

  render() {
    //const { user } = this.props.auth;

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
          <button onClick = {this.createItem}>createItem</button>
          {this.state.items.map(item => 
            <div key={item._id}>
              {item.description})
              <button onClick={() => this.deleteItem(item._id)}>delete</button>
              <button onClick={()=>this.togglePop(item._id)}>More</button>
              {this.state.seen==item._id ? 
                <div className="dropdown">
                  <span className="dashboard-item_description">{item.description}</span> 
                </div>
                : null}
            </div>
          )}
          <button onClick = {this.findAllItems}>findAllItems</button>
				</div>
				Content.
			</div>
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

ManageItems.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageItems);