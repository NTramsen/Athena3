import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import NavBar from '../NavBar/NavBar';
import './Checkout.css';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api/users'
})

class Checkout extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      newItemNum: ''
	    };
	};

	checkoutItems = async() => {
		const user = this.props.usr.user;
		const userInfo = Object.values(user);
		const id = userInfo[0];

		const itemid = this.state.newItemNum;

		console.log("userID: " + id);
		console.log("item in Checkout.js " + itemid);
		let data = await api.post('/checkoutItem', {id: id, items: itemid});
	}

	updateItems() {
		console.log(this.state.newItemNum);
	};

	itemObjectValid() { //todo should parse item table to see if id exists && !checkedout
		// const numValid = this.state.newItemNum && Number.parseFloat(this.state.newItemNum);
		// return numValid;
		return true;
	};

	clearForm() {
		this.setState({newItemNum: ''});
	};

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
	          <div className='checkout-container'>
				<div className='checkout_header'>
					<p className='checkout-title'>Checkout a new item</p>
				</div>
				<input className = 'checkout-form'
					placeholder = 'Enter item number'
					type = 'text'
					value = {this.state.newItemNum}
					onChange={(e)=>this.setState({newItemNum: e.target.value})}></input>
				<button className = 'checkout-button'
					onClick={()=>{
						if(this.itemObjectValid()){
							this.checkoutItems();
							//this.updateItems();
							this.clearForm(); //todo this only works for ints not on mix of strings/ints
						}
					}}>Checkout Item</button>
			</div>
        </div>
        <button
        onClick={this.onLogoutClick}
        className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

Checkout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Checkout);
