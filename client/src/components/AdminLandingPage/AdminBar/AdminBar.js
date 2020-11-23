import React from 'react';
import {NavLink} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import '../../../App.css';
import {AdminBarData} from './AdminBarData';

function AdminBar(){

	return(
		<>
			<nav className = 'ad-nav-menu'>
			<ul className = 'ad-nav-menu-items'>
					{AdminBarData.map((item, index)=>{
						return(
							<li key={index} className={item.cName}>
								<NavLink to = {item.path} activeClassName = 'active'>
									<span className='nav-icon'>{item.icon}</span>
									<span className='nav-text'>{item.title}</span>
								</NavLink>
							</li>
						)
					})} 
				</ul>
			</nav>
		</>
	);
};

export default AdminBar;
