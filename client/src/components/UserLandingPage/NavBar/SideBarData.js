import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SideBarData = [
	{
		title: 'Dashboard',
		path: '/dashboard',
		icon: <FaIcons.FaHome size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'Checkout',
		path: '/checkout',
		icon: <FaIcons.FaClipboardCheck size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'Search',
		path: '/search',
		icon: <FaIcons.FaSearch size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'My Items',
		path: '/myitems',
		icon: <FaIcons.FaClipboardList size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'My Account',
		path: '/myaccount',
		icon: <FaIcons.FaUserCircle size={30}/>,
		cName: 'nav-text'
	} /*,
	{
		title: 'Logout',
		path: '/logout',
		icon: <FaIcons.FaDoorOpen size={30}/>,
		cName: 'nav-text'
	}*/
];