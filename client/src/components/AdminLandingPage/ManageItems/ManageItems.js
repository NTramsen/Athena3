import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import './ManageItems.css';

class ManageItems extends Component {

	constructor(props) {
	    super(props);
  };

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
    //const { user } = this.props.auth;
    
      const getCurrentItems = ()=>{
        return [
          {
            name: "Stethoscope",
            return_date: "8 hours",
            item_id: 23801
          },
          {
            name: "Behavioural biology textbook",
            return_date: "2 days",
            item_id: 48920
          },
          {
            name: "Design kit",
            return_date: "6 days",
            item_id: 98384
          }
        ];
      }
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
					<p>Manage Items</p>
				</div>
				<div className='current-list'>
				
				  <ul>
					  {getCurrentItems().map((item, index)=>{
						  return(
						  	<li key={index}>
							  	<span>{item.name}</span>
								  <span>{item.return_date}</span>
								  <span>{item.item_id}</span>
								  <button className = 'remove_btn'>Remove</button>
							  </li>
						  )
					  })}
				  </ul>
			  </div>
			</div>
        <input className = 'additem-form'
            placeholder = 'Enter item name'
            type = 'text'></input>
          <button className = 'checkout-button-btn'>Add item</button>

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