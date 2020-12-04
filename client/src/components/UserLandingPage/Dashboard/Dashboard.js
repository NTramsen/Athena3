import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
//import NavBar from '../NavBar/NavBar';

import '../../../App.css';
import axios from 'axios';

// import ItemInterface from '../ItemInterface/ItemInterface';

const api = axios.create({
	baseURL: 'http://localhost:5000/api/'
})

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			myItems: [],
			myOverdues: [],
			dueSoon: [],
			numOfItems: 0,
			numOfOverdue: 0,
			seen: -1
		}
	};

	componentDidMount() {
		this.findAllItems();
	};

	findAllItems = async () => {

		const user = this.props.usr.user;
		const info = Object.values(user);
		const id = info[0];
		var dueSoon = [];
		var myItems = [];
		var myOverdues = [];
		let data = await api.put('/users/getuseritems', { id: id }).then(({ data }) => data);

		for (var i = 0; i < data.items.length; i++) {
			let item_data = await api.get(`/items/${data.items[i]}`).then((response) => {
				return response.data;
			});
			//console.log("item_data.dueDate: " + item_data.dueDate);
			
			if (item_data) {
				var today = new Date();
				var dueSoonDate = new Date();
				dueSoonDate.setDate(dueSoonDate.getDate() + 3);
				var dueDate = new Date(item_data.dueDate);
				//console.log("dueDate: " + dueDate);
				//console.log(item_data.type, today, dueDate);
				if (item_data.dueDate && dueDate < today) {
					myOverdues.push({
						type: item_data.type,
						description: item_data.description,
						item_id: item_data._id,
						dueDate: item_data.dueDate
					});
				}
				else {
					myItems.push({
						type: item_data.type,
						description: item_data.description,
						item_id: item_data._id,
						dueDate: item_data.dueDate
					});
				}
				
				if (dueSoonDate >= dueDate) {
					for (var j = 0; j < myItems.length; j++) {
						var add = true;
						if (myItems[j]._id === item_data._id) {
							add = false;
						}
					}
					if (add) {
						dueSoon.push({
							type: item_data.type,
							description: item_data.description,
							item_id: item_data._id,
							dueDate: item_data.dueDate
						});
					}
				}
			}
		}
		let numOfItems = myItems.length;
		let numOfOverdue = myOverdues.length;
		this.setState({
			myItems: myItems,
			myOverdues: myOverdues,
			dueSoon: dueSoon,
			numOfItems: numOfItems,
			numOfOverdue: numOfOverdue
		});
	};

	togglePop = (item_id) => {
		this.setState({
			seen: item_id
		});
	};

	render() {
		return (
	        <div className = 'content'>
		      	<div className='component-container'>
					<div className='component-header'>
						<p className='component-title'>All current items</p>
						<p className='sub-title'>Number of overdue checkouts: {this.state.numOfOverdue}</p> 
			 			<p className='sub-title'>Number of current checkouts: {this.state.numOfItems}</p> 
					</div>
					<div className='current-list'>
						<div>
							<p className='dashboard-sub-title'>Overdue Items:</p>
							<div className='dashboard_header'>
								{/* <span className="manageuser_header_style1">Item Name</span> */}
							</div>
				           
				            {this.state.myOverdues.map(checkout =>
				              <div className ='manageitem_list' key={checkout.item_id}>
								  <span className="manageitem_name">{checkout.type}</span>
              						<span className="manageitem_button"><button className = 'checkout-button-btn' onClick={()=>this.togglePop(checkout.item_id.toString())}>More</button></span>  				                
				                {this.state.seen===checkout.item_id ? 
				                  <div className="dropdown">
									<span className='item_description'>Item description: </span>
				                    <span className="dashboard-item_description">{checkout.description}</span>
				                  </div>
				                  : null}
				              </div>
				            )}
			          	</div>
			          	<div>
						 	 <p className='dashboard-sub-title'>Items Due Soon:</p>
							  <div className='dashboard_header'>
								{/* <p className="manageuser_header_style1">Item Name</p> */}
							</div>
				            {this.state.dueSoon.map(checkout =>
				              <div className ='manageitem_list' key={checkout.item_id}>
				                <span className="manageitem_name">{checkout.type}</span>
								<span className="manageitem_button"><button className='checkout-button-btn' onClick={()=>this.togglePop(checkout.item_id.toString())}>More</button></span>             
				                {this.state.seen===checkout.item_id ? 
				                  <div className="dropdown">
				                    <span className="dashboard-item_description">{checkout.description}</span>
				                  </div>
				                  : null}
				              </div>
				            )}   
			          	</div>
					</div>
				</div>
	        </div>
		);
	}
}

		// 	<div className='content'>
		// 		<div className='component-container'>
		// 			<div className='component-header'>
		// 				<p className='component-title'>Your Items</p>
		// 			</div>
		// 		</div>
		// 		<div className='dashboard-list_header'>
		// 			<div className='current-list'>
		// 				<ul className='dashboard-dashboard-list-items'>
		// 					<p className='sub-title'>Number of overdue checkouts: {this.state.numOfOverdue}</p> 
		// 					<p className='sub-title'>Number of current checkouts: {this.state.numOfItems}</p> 
		// 				</ul>
		// 				<p className="dashboard-header_style">Overdue Items:</p>
		// 				<div>
		// 				{this.state.myOverdues.map(checkout =>
		// 					<div className = 'manageitem_list' key={checkout.item_id}>
		// 						{checkout.name}
		// 						{checkout.type}
		// 						<button onClick={() => this.togglePop(checkout.item_id.toString())}>More</button>
		// 						{this.state.seen === checkout.item_id ?
		// 							<div className="dropdown">
		// 								<span className="dashboard-item_description">{checkout.description}</span>
		// 							</div>
		// 							: null}
		// 					</div>
		// 				)}
		// 				</div>
		// 				<p className="dashboard-header_style">Items Due Soon:</p>
		// 				<div>
		// 					{this.state.dueSoon.map(checkout =>
		// 						<div className = 'manageitem_list' key={checkout.item_id}>
		// 							<span className="manageitem_name">{checkout.name}</span>
		// 							{checkout.type}
		// 							<button onClick={() => this.togglePop(checkout.item_id.toString())}>More</button>
		// 							{this.state.seen === checkout.item_id ?
		// 								<div className="dropdown">
		// 									<span className="dashboard-item_description">{checkout.description}</span>
		// 								</div>
		// 								: null}
		// 						</div>
		// 					)}
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// );
Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	usr: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(Dashboard);

//export default Dashboard;