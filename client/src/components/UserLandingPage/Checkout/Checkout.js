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
	      newItemNum: '',
	      duration:null,
	      errors: '',
	      success: ''
	    };
	};

	checkoutItems = async() => {
		const user = this.props.usr.user;
		const userInfo = Object.values(user);
		const id = userInfo[0];

		const itemid = this.state.newItemNum;
		const dur = this.state.duration;

		if(dur<1){
			this.setState({errors:'Invalid checkout length.'});
			return;
		}

		else if(dur>14){
			this.setState({errors:'Invalid checkout length.'});
			return;
		}

		//console.log("userID: " + id);
		//console.log("item in Checkout.js " + itemid);
		api.put('/checkoutItem', {id: id, item: itemid, duration: dur}).then( response => {
			this.setState({errors:'', success: 'Item added to My Items.'});
			//console.log(response);
		}).catch(e => {
			this.setState({errors:'Unable to check out item.', success: ''});
			//console.log(e);
		});
	}

	itemObjectValid() { //todo should parse item table to see if id exists && !checkedout
		// const numValid = this.state.newItemNum && Number.parseFloat(this.state.newItemNum);
		// return numValid;
		return true;
	};

	clearForm() {
		this.setState({newItemNum: '', duration:7});
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
					type = 'text'
					value = {this.state.newItemNum}
					onChange={(e)=>this.setState({newItemNum: e.target.value})}></input>
				<input 
					placeholder = 'Desired checkout duration'
					type = 'number'
					onChange={(e)=>this.setState({duration: e.target.value})}></input>
				<button className = 'checkout-button'
					onClick={()=>{
						if(this.itemObjectValid()){
							this.checkoutItems();
							this.clearForm(); //todo this only works for ints not on mix of strings/ints
						}
					}}>Checkout Item</button>
				<span className='red-text'>{this.state.errors}</span>
				<span className='green-text'>{this.state.success}</span>
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
