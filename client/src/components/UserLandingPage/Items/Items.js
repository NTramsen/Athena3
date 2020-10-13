import React from 'react';

const Items = ()=>{
	const getCurrentItems = ()=>{
		return [
			{
				name: "Stethoscope",
				return_date: "8 hours",
				item_id: 23801
			},
			{
				name: "Behavioural biology textbook",
				return_date: "2 days",
				item_id: 48920
			},
			{
				name: "Design kit",
				return_date: "6 days",
				item_id: 98384
			}
		];
	}

	const getPastItems = ()=>{
		return [
			{
				name: "Glass beaker",
				return_date: "Returned 5 days ago",
				item_id: 23801
			},
			{
				name: "Oscilloscope",
				return_date: "Returned 2 weeks ago",
				item_id: 48920
			},
			{
				name: "Stem cell textbook",
				return_date: "Returned 8 weeks ago",
				item_id: 98384
			},
			{
				name: "T98 Video camera",
				return_date: "Returned 10 weeks ago",
				item_id: 98384
			}
		];
	}

	return(
		<div className='items-container'>
			<div className='items-header'>
				<p>Your item history</p>
			</div>
			<div className='current-list'>
				<p>Current items:</p>
				<ul>
					{getCurrentItems().map((item, index)=>{
						return(
							<li key={index}>
								<span>{item.name}</span>
								<span>{item.return_date}</span>
								<button type="button">More</button>
							</li>
						)
					})}
				</ul>
			</div>
			<div className='returned-list'>
				<p>Past items:</p>
				<ul>
					{getPastItems().map((item, index)=>{
						return(
							<li key={index}>
								<span>{item.name}</span>
								<span>{item.return_date}</span>
								<button type="button">More</button>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	);
}

export default Items;