import React, {Component} from 'react';
//import './Dashboard.css';
import ItemInterface from '../ItemInterface/ItemInterface';

class Dashboard extends Component{

	constructor(props){
	    super(props);
	};

	state = {
		seen: -1
	}

	togglePop = (item_id) => {
	    this.setState({
	    	seen: item_id
	    });
	};

	getItems = ()=>{
		return [
			{
				name: "Stethoscope",
				return_date: "8 hours",
				item_id: 23801,
				description: "This is a stethoscope w vwrbv rj er ver  "
			},
			{
				name: "Behavioural biology textbook",
				return_date: "2 days ",
				item_id: 48920,
				description: "This is a textbook w vwrbv rj er ver  "
			},
			{
				name: "Design kit",
				return_date: "6 days ",
				item_id: 98384,
				description: "This is a design kit w vwrbv rj er ver  "
			}
		];
	};

	render(){
		return (
			<div className='dashboard-dashboard-container'>
				<div className='dashboard-dashboard-header'>
					<div className='dashboard-dashboard-title'>
						Your items
					</div>
				</div>
				<div className='dashboard-list_header'>
					<div className='dashboard-item_header'>
						<span className="dashboard-header_style1">Item Name</span>
						<span className="dashboard-header_style2">Return Date</span>
						<span className="dashboard-header_style3">Item ID</span>
					</div>
				</div>
				
				<div className='dashboard-dashboard-list'>
					<ul className='dashboard-dashboard-list-items'>
						
						{this.getItems().map((item, index)=>{
							return(
								<li key={index} className="dashboard-itemlist-element">
									<div className="dashboard-item_a">
										<span className="dashboard-item_name">{item.name}</span>
										<span className="dashboard-item_date">{item.return_date}</span>
										<span className="dashboard-item_id">{item.item_id}</span>
										<button onClick={()=>this.togglePop(item.item_id)}>
						                  More
						                </button>
										{this.state.seen==item.item_id ? <span className="dashboard-item_description">{item.description}</span> : null}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default Dashboard;