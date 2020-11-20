import React from 'react';
import {NavLink} from 'react-router-dom';
import {SideBarData} from './SideBarData';
import '../../../App.css';
import * as FaIcons from 'react-icons/fa';

function NavBar(){

	return(
		<>
			<nav className = 'nav-menu'>
				<ul className = 'nav-menu-items'>
					{SideBarData.map((item, index)=>{
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

export default NavBar;

