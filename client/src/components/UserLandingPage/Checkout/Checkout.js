import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import NavBar from '../NavBar/NavBar';
import '../../../App.css';
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
		const item = this.state.newItemNum;
		//const userId = todo get userId from state?;
		const email = "anthonytest@test.com"
		console.log("item in Checkout.js " + item);
		let data = await api.post('/checkoutItem', {email: email, items: item});
		console.log("data: " + data);
	}

	updateItems() {
		console.log(this.state.newItemNum);
	};

	itemObjectValid() {
		const numValid = this.state.newItemNum && Number.parseFloat(this.state.newItemNum);
		return numValid;
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
	          <div className='component-container'>
				<div className='component-header'>
					<p className='component-title'>Checkout a new item</p>
				</div>
				<input
					placeholder = 'Enter item number'
					type = 'number'
					value = {this.state.newItemNum}
					onChange={(e)=>this.setState({newItemNum: e.target.value})}></input>
				<button className = 'checkout-button'
					onClick={()=>{
						if(this.itemObjectValid()){
							this.checkoutItems();
							//this.updateItems();
							this.clearForm();
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
