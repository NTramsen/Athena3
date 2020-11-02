import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api/items'
})

class ManageItems extends Component {

  state = {
    items: []
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
      type: 'testcase',
      description: 'this is a testcase',
      borrowed: false
    });
    console.log(res);
  }

  deleteItem = async(id) =>{
    let data = await api.delete(`/${id}`);
    this.findAllItems();
  }  

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
          {this.state.items.map(item => <h2 key={item.type}>{item.description})
          <button onClick={() => this.deleteItem(item.type)}>delete</button></h2>)}
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