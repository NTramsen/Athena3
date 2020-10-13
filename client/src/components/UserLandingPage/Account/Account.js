import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

const Account = ()=>{

	const getAccountInfo = ()=>{
		return [
			{
				username: "Neil Tramsen",
			},
			{
				email_address: "ntramsen112@gmail.com",
			}
		];
	}
	return(
		<div className='account-container'>
			<div className = 'account-header'>
				<h2>Your account details</h2>
			</div>
			<div className = 'account-content'>
				<ul className='account-info-list'>
					{getAccountInfo().map((info, index)=>{
						return(
							<li key={info} className="account-info-list-element">
								<span>{info.username}</span>
								<span>{info.email_address}</span>
							</li>
						)
					})}
				</ul>
			</div>                
			<div className = 'edit-account'>
				<button type='button'>Edit details</button>
				<button type='button'>Change password</button>
			</div>
		</div>
	);
}

export default Account;