

import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import './Search.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/items'
})


class Search extends Component {

	constructor(props) {
    super(props)
    this.state = {
       items: [],
       inputValue: ''
    }
	};

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  
  searchItems = async(regex) =>{
    const params = {
      type: String(regex)
    };
    console.log(params);
    let data = await api.get('/', {params}).then( ({data}) => data);
    console.log(data);
    this.setState({items : data});
  }

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
    //const { user } = this.props.auth;

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome Neil Tramsen</h1>
        </div>
        <div className = 'navbar'>
          <NavBar/>
        </div>
        <div className = 'content'>
          <div className='search-container'>
            <div className='search_header'>
              <p>Search for an item</p>
            </div>
            <input className = 'search-form'
              placeholder = 'Enter item name'
              value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}
              type = 'text'></input>
            <button className = 'checkout-button-btn' onClick = {() => this.searchItems(this.state.inputValue)}>Search</button>
              {this.state.items.map(item => <p key={item.type}>{item.description})
            <button onClick={() => this.deleteItem(item._id)}>delete</button></p>)}
          </div>
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

Search.defaultProps = {
  items: [], 
  inputValue: ''
}

Search.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Search);