import React from 'react';
import {Link} from 'react-router-dom';
import {SideBarData} from './SideBarData';
import './NavBar.css';
import * as FaIcons from 'react-icons/fa';

function NavBar(){

	return(
		<>
			<nav className = 'nav-menu'>
				<ul className = 'nav-menu-items'>
					{SideBarData.map((item, index)=>{
						return(
							<li key={index} className={item.cName}>
								<Link to = {item.path}>
									<FaIcons.FaHome size={30}/>
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

export default NavBar;

