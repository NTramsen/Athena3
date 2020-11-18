import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './AdminBar.css';
import {AdminBarData} from './AdminBarData';

function AdminBar(){

	return(
		<>
			<nav className = 'ad-nav-menu'>
			<ul className = 'ad-nav-menu-items'>
					{AdminBarData.map((item, index)=>{
						return(
							<li key={index} className={item.cName}>
								<Link to = {item.path}>
									<span className='nav-icon'>{item.icon}</span>
									<span className='nav-text'>{item.title}</span>
								</Link>
							</li>
						)
					})} 
				</ul>
			</nav>
		</>
	);
};

export default AdminBar;
