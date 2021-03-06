import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const AdminBarData = [
	{
		title: 'Dashboard',
		path: '/AdminLanding',
		icon: <FaIcons.FaHome size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'Manage Users',
		path: '/ManageUsers',
		icon: <FaIcons.FaUsers size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'Manage items',
		path: '/ManageItems',
		icon: <FaIcons.FaBoxes size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'Manage checkouts',
		path: '/ManageCheckouts',
		icon: <FaIcons.FaShoppingCart size={30}/>,
		cName: 'nav-text'
	},
	{
		title: 'My Account',
		path: '/adminAccount',
		icon: <FaIcons.FaUserCircle size={30}/>,
		cName: 'nav-text'
	}

];
