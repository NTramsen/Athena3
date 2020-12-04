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
				dueSoonDate = dueSoonDate+ 3;
				//console.log("dueSoonDate" + (today + 3));
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
				
				if (dueSoonDate >= item_data.dueDate) {
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
			<div className='content'>
				<div className='component-container'>
					<div className='component-header'>
						<p className='component-title'>Your Items</p>
					</div>
				</div>
				<div className='dashboard-list_header'>
					<div className='dashboard-item_header'>
						<ul className='dashboard-dashboard-list-items'>
							<p className='sub-title'>Number of overdue checkouts: {this.state.numOfOverdue}</p> 
							<p className='sub-title'>Number of current checkouts: {this.state.numOfItems}</p> 
						</ul>
						<p className="dashboard-header_style">Overdue Items:</p>
						<div>
						{this.state.myOverdues.map(checkout =>
							<div key={checkout.item_id}>
								{checkout.name}
								{checkout.type}
								<button onClick={() => this.togglePop(checkout.item_id.toString())}>More</button>
								{this.state.seen === checkout.item_id ?
									<div className="dropdown">
										<span className="dashboard-item_description">{checkout.description}</span>
									</div>
									: null}
							</div>
						)}
						</div>
						<p className="dashboard-header_style">Items Due Soon:</p>
						<div>
							{this.state.dueSoon.map(checkout =>
								<div key={checkout.item_id}>
									{checkout.name}
									{checkout.type}
									<button onClick={() => this.togglePop(checkout.item_id.toString())}>More</button>
									{this.state.seen === checkout.item_id ?
										<div className="dropdown">
											<span className="dashboard-item_description">{checkout.description}</span>
										</div>
										: null}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='dashboard-dashboard-list'>

					{/* {this.getItems().map((item, index)=>{
							return(
								<li key={index} className="dashboard-itemlist-element">
									<div className="dashboard-item">
										<span className="dashboard-item_name">{item.name}</span>
										<span className="dashboard-item_date">{item.return_date}</span>
										<span className="dashboard-item_id">{item.item_id}</span>
										<span className="dashboard-item_btn"><button className = "item-button_btn" onClick={()=>this.togglePop(item.item_id)}>
						                  More
						                </button></span>
										
										{this.state.seen===item.item_id ? 
											<div className="dropdown">
												<span className="dashboard-item_description">{item.description}</span> 
												<button className="item-button_btn">Return</button>
											</div>
											: null}
									</div>
								</li>
							)
						})} */}
				</div>
			</div>
		);
	}
}
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