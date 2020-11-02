import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './AdminDashboard.css';


const AdminDashboard = ()=>{

	
	const getItems = ()=>{
		return [
			{
				name: "Stethoscope",
				return_date: "8 hours",
				item_id: 23801
			},
			{
				name: "Behavioural biology textbook",
				return_date: "2 days ",
				item_id: 48920
			},
			{
				name: "Design kit",
				return_date: "6 days ",
				item_id: 98384
			}
		];
	}

	return(
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<div className='dashboard-title'>
					Your items
				</div>
			</div>
			<div className='list_header'>
				<div className='item_header'>
					<span className="header_style1">Item Name</span>
					<span className="header_style2">Return Date</span>
					<span className="header_style3">Item ID</span>
				</div>
			</div>
			
			<div className='dashboard-list'>
				<ul className='dashboard-list-items'>
					
					{getItems().map((item, index)=>{
						return(
							<li key={index} className="itemlist-element">
								<Link to = "./item" className="item_a">
										<span className="item_name">{item.name}</span>
										<span className="item_date">{item.return_date}</span>
										<span className="item_id">{item.item_id}</span>
										
								</Link>

							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default AdminDashboard;