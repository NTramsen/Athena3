import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './AdminBar.css';
import {AdminBarData} from './AdminBarData';

function AdminBar(){

	return(
		<>
			<nav className = 'nav-menu'>
			<ul className = 'nav-menu-items'>
					{AdminBarData.map((item, index)=>{
						return(
							<li key={index} className={item.cName}>
								<Link to = {item.path}>
									{item.icon}
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
