import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './AdminDashboard.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

class AdminDashboard extends Component{

	state={
		users: 0,
		items: 0,
		checks:0
	};

	componentDidMount(){
		this.getCounts();
    };

    getCounts=async()=>{

    	let data = await api.get('/users/').then( ({data}) => data);
    	this.setState({users : data.length});

    	data = await api.get('/items/').then( ({data}) => data);
    	this.setState({items : data.length});

    }

	render(){
		return(
			<div className='dashboard-container'>
				<div className='dashboard-header'>
					<div className='dashboard-title'>
						Database Overview
					</div>
				</div>
				
				<div className='dashboard-list'>
					<span>Total users:</span> {this.state.users}
					<span>Total items:</span> {this.state.items}
					<span>Number of current checkouts: (To be implemented)</span> {this.state.checks}
				</div>
			</div>
		);
	}
};

export default AdminDashboard;