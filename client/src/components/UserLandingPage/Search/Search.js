

import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import '../../../App.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})


class Search extends Component {

	constructor(props) {
    super(props)
    this.state = {
       items: [],
       inputValue: '',
       seen: -1,
       duration: 7
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
    let data = await api.get('/items/', {params}).then( ({data}) => data);
    data = data.filter(function(e) { return e.borrowed === false });
    this.setState({items : data});
  }

  togglePop = (item_id) => {
    if(this.state.seen===item_id){
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

  checkoutItems = async(userid, itemid) => {

    const dur = this.state.duration;

    api.put('users/checkoutItem', {id: userid, item: itemid, duration: dur}).then( response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });

    window.location.reload(false);
    
  }

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
          <NavBar/>
        </div>
        <div className = 'content'>
          <div className='component-container'>
            <div className='component-header'>
              <p className='component-title'>Search for an item</p>
            </div>
            <input
              placeholder = 'Enter item name'
              value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}
              type = 'text'></input>
            <button className = 'checkout-button-btn' onClick = {() => this.searchItems(this.state.inputValue)}>Search</button>
            {this.state.items.map(item => 
              <div key={item._id}>
                <div className='dashboard-item'>
                  <span >{item.type}</span>
                  <button className = 'checkout-button-btn1' onClick={()=>this.togglePop(item._id.toString())}>More</button>
                </div>
                {this.state.seen===item._id ? 
                  <div className="dropdown">
                    <span className='item_description'>Item description: </span>
                    <span className="dashboard-item_description">{item.description}</span>
                    <input 
                      placeholder = 'Desired checkout duration'
                      type = 'number'
                      value = {this.state.duration}
                      onChange={(e)=>this.setState({duration: e.target.value})}></input>
                    <button className = 'checkout-button-btn' onClick={() => this.checkoutItems(info[0], item._id.toString())}>Checkout</button>
                  </div>
                  : null}
              </div>
            )}
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
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Search);
