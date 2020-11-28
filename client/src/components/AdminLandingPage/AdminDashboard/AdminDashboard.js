import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import * as FaIcons from 'react-icons/fa';
//import AdminBar from '../AdminBar/AdminBar';
import '../../../App.css';
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
    	let total = 0;
    	let index = 0;
    	for (index = 0; index < data.length; index++) { 
		    total = total+data[index].items.length; 
		}
		this.setState({checks : total});

    	data = await api.get('/items/').then( ({data}) => data);
    	this.setState({items : data.length});
    };

	render(){
		return(
		
			<div className='dashboard-container'>
				<div className='component-header'>
					<div className='component-title'>
						<p className='component-title'>Database Overview</p>
					</div>
				</div>
				
				<div className='dashboard-list'>
					<ul>
						<li><span className='sub-title'>Total users:</span> {this.state.users}</li>
						<li><span className='sub-title'>Total items:</span> {this.state.items}</li>
						<li><span className='sub-title'>Number of current checkouts:</span> {this.state.checks}</li>
					</ul>
				</div>
			</div>
			
		);
	}
};

export default AdminDashboard;