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

	return(
		<div className='dashboard-container'>
			<div className='dashboard-header'>
				<p>Your items</p>
			</div>
			<div className='dashboard-list'>
				<ul className='dashboard-list-items'>
					{getItems().map((item, index)=>{
						return(
							<li key={index} className="itemlist-element">
								<Link to = "./item">
									<span>{item.name}</span>
									<span>{item.return_date}</span>
									<FaIcons.FaArrowAltCircleRight size={20}/>
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