import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ()=>{

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
				<p className="item_title">Your items</p>
			</div>
			<div className='dashboard-list'>
				<ul className='dashboard-list-items'>
					{getItems().map((item, index)=>{
						return(
							<li key={index} className="itemlist-element">
								<Link to = "./item" className="item_a">
									<p className="item_name">{item.name}</p>
                                    <div className="item_date">return date: {item.return_date}</div>
                                    <div className="item_id">item id: {item.item_id}</div>
									<FaIcons.FaArrowAltCircleRight size={60}/>
								</Link>

							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default Dashboard;