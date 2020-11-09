import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import NavBar from '../NavBar/NavBar';
import './Checkout.css';

class Checkout extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      newItemName: '',
	      newItemNum: ''
	    };
	};
	
	updateItems() {
		console.log(this.state.newItemName, this.state.newItemNum);
	};

	itemObjectValid() {
		const numValid = this.state.newItemNum && Number.parseFloat(this.state.newItemNum);
		const nameValid = this.state.newItemName && this.state.newItemName.split('').find(char=>char !== ' ');
		return numValid && nameValid;
	};

	clearForm() {
		this.setState({newItemName: ''});
		this.setState({newItemNum: ''});
	};

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
    //const { user } = this.props.auth;

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          Welcome Neil Tramsen
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
					placeholder = 'Enter item name'
					type = 'text'
					value = {this.state.newItemName}
					onChange={(e)=>this.setState({newItemName: e.target.value})}></input>
				<input className = 'checkout-form'
					placeholder = 'Enter item number'
					type = 'number'
					value = {this.state.newItemNum}
					onChange={(e)=>this.setState({newItemNum: e.target.value})}></input>
				<button className = 'checkout-button'
					onClick={()=>{
						if(this.itemObjectValid()){
							// updateBills
							this.updateItems();
							this.clearForm();
						}
					}}>Add item</button>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Checkout);