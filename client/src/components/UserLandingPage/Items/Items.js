import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import NavBar from '../NavBar/NavBar';
import '../../../App.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/'
})

class Items extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			myItems: [],
			myOverdues: [],
			seen:-1,
			errors: ""
	    };
	};
	
	returnItems = async(itemid) => {
		const user = this.props.usr.user;
		const userInfo = Object.values(user);
		const id = userInfo[0];

		api.put('users/removeitem', {id: id, item: itemid}).then( response => {
			console.log(response);
		}).catch(e => {
			console.log(e);
		});

		window.location.reload(false);
	}

	componentDidMount(){
		this.findAllItems();
	};

	findAllItems = async() => {

		const user = this.props.usr.user;
		const info = Object.values(user);
		const id = info[0];
		var myItems = [];
    	var myOverdues = [];
	    let data = await api.put('/users/getuseritems', {id: id}).then( ({data}) => data);

	    for(var i=0; i<data.items.length; i++){
	        let item_data = await api.get(`/items/${data.items[i]}`).then((response)=>{
	        	return response.data;
	        });
	        if(item_data){
	            var today = new Date();
	          	var dueDate = new Date(item_data.dueDate);
	          	console.log(item_data.type, today, dueDate);
	          	if(item_data.dueDate && dueDate<today){
		            myOverdues.push({
		              	type: item_data.type,
		              	description: item_data.description,
		              	item_id: item_data._id,
		              	dueDate: dueDate
		            });
	          	}
	          	else{
		            myItems.push({
		              	type: item_data.type,
		              	description: item_data.description,
		              	item_id: item_data._id,
		              	dueDate: dueDate
		            });
	          	}
	        }
	    }
	    console.log(myItems);
	    console.log(myOverdues);
	    this.setState({
        	myItems: myItems,
        	myOverdues: myOverdues
	    });
  	};
	
	togglePop = (item_id) => {
    if(this.state.seen===item_id){
      this.setState({
        seen: -1
      });
    }
    else{
      this.setState({
        seen: item_id
      });
    }
	};


	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
		const user = this.props.usr.user;
		const info = Object.values(user);
    return (
        <div className = 'main-container'>
	        <div className = 'top-banner'>
	          Welcome {info[1]}
	        </div>
	        <div className = 'navbar'>
	        	<NavBar/>
	        </div>
	        <div className = 'content'>
		      	<div className='component-container'>
					<div className='component-header'>
						<p className='component-title'>All current items</p>
					</div>
					<div className='current-list'>
						
						<div>
							<p className='sub-title'>View currently checked-out items:</p>
							<div className='manageuser_header'>
								<span className="manageuser_header_style1">Item Name</span>
								<span className="manageuser_header_style2">Due Date</span>
							</div>
				           
				            {this.state.myItems.map(checkout =>
				              <div className ='manageitem_list' key={checkout.item_id}>
								  {/* {checkout.name} */}
								  <span className="manageitem_name">{checkout.type}</span>
									<span className="manageitem_date">{checkout.dueDate? checkout.dueDate.getMonth()+"/"+checkout.dueDate.getDate()+"/"+checkout.dueDate.getFullYear() : null}</span> 
              						<span className="manageitem_button"><button className = 'checkout-button-btn' onClick={()=>this.togglePop(checkout.item_id.toString())}>More</button></span>  				                
				                {this.state.seen===checkout.item_id ? 
				                  <div className="dropdown">
									<span className='item_description'>Item description: </span>
				                    <span className="dashboard-item_description">{checkout.description}</span>
				                    <button className = 'checkout-button-btn' onClick={()=>this.returnItems(checkout.item_id)}>Return item</button>
				                  </div>
				                  : null}
				              </div>
				            )}
			          	</div>
			          	<div>
						 	 <p className='sub-title'>View over-due items:</p>

							  <div className='manageuser_header'>
								<span className="manageuser_header_style1">Item Name</span>
							</div>

				            {this.state.myOverdues.map(checkout =>
				              <div className ='manageitem_list' key={checkout.item_id}>
				                {/* {checkout.name} */}
				                <span className="manageitem_name">{checkout.type}</span>
								<span className="manageitem_button"><button className='checkout-button-btn' onClick={()=>this.togglePop(checkout.item_id.toString())}>More</button></span>             
				                {this.state.seen===checkout.item_id ? 
				                  <div className="dropdown">
				                    <span className="dashboard-item_description">{checkout.description}</span>
				                    <button className = 'checkout-button-btn' onClick={()=>this.returnItems(checkout.item_id)}>Return item</button>
				                  </div>
				                  : null}
				              </div>
				            )}   
			          	</div>
					</div>
				</div>
	        </div>
	        <button
	        	onClick={this.onLogoutClick}
	        	className="btn btn-large waves-effect waves-light hoverable blue accent-3">Logout</button>
      </div>
    );
  }
}

Items.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Items);
