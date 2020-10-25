import React from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

function AdminBar(){

	return(
		<>
			<nav className = 'nav-menu'>
				<ul className = 'nav-menu-items'>
						<li className='menu-item'>
							<Link to = "/adminLanding">
								<FaIcons.FaClipboardCheck size={30}/>
								<span className='nav-text'>Dashboard</span>
							</Link>
							<Link to = "/manageItems">
								<FaIcons.FaClipboardCheck size={30}/>
								<span className='nav-text'>Manage items</span>
							</Link>
							<Link to = "/manageUsers">
								<FaIcons.FaClipboardCheck size={30}/>
								<span className='nav-text'>Manage users</span>
							</Link>
						</li>
				</ul>
			</nav>
		</>
	);
};

export default AdminBar;
