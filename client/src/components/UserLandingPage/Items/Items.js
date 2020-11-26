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
				newItemNum: '',
				items: [],
				seen:-1,
				new_type: "",
				new_desc: "",
				errors: ""
	    };
	};

	// state = {
  //   items: [],
  //   seen:-1,
  //   new_type: "",
  //   new_desc: "",
  //   errors: ""
	// };
	
	returnItems = async() => {
		const user = this.props.usr.user;
		const userInfo = Object.values(user);
		const id = userInfo[0];
		const itemid = this.state.newItemNum;
		console.log("called returnItems in Items.js with " );
		console.log("id: " + id);
		console.log("items: " + itemid);

		let data = api.put('users/removeitem', {id: id, item: itemid}).then( response => {
			console.log(response);
		}).catch(e => {
			console.log(e);
		});
	}

	componentDidMount(){
		//this.findAllItems();
		this.getCurrentItems();
  };

	findAllItems = async() => {
    let data = await api.get('items').then( ({data}) => data);
    this.setState({items : data});
	};
	
	togglePop = (item_id) => {
    if(this.state.seen==item_id){
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
	
	getCurrentItems = async() => {
		const user = this.props.usr.user;
		const info = Object.values(user);
		const id = info[0];
		
		console.log("getCurrentItems running");
		try {
			console.log("passing id: " + id);
			let data = await api.get('users/getuseritems', {id: id}).then(({data}) => data);
			console.log("data: " + data);

			this.setState({items : data.items});
		} catch(e) {
			console.log(e);
		}
		console.log("have set state");
		//data is a JSON. check findAllItems to see how items are returned,
		//get the data from JSon to then match how items are returned so mapping is succuessful

	}

	getPastItems() {
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

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  render() {
		const user = this.props.usr.user;
		const info = Object.values(user);
		//getCurrentItems();
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
				<p className='component-title'>Your item history</p>
				<button className = 'checkout-button'
					onClick={()=>{
						this.getCurrentItems();
					}}>test current</button>
			</div>
			<div className='current-list'>
				<p className='sub-title'>All current items</p>
				{this.state.items.map(item => 
              <div key={item._id}>
                {item.type}
                <button className='item-button_btn' onClick={()=>this.togglePop(item._id)}>More</button>
								<button className = 'item-button_btn' onClick={()=> {
									this.setState({newItemNum: item._id})
									this.returnItems(item._id);
									}}>Return</button>
								{this.state.seen==item._id ? 
                  <div className="dropdown">
                    <span className="dashboard-item_description">{item.description}</span> 
                  </div>
                  : null}
              </div>
            )}
					{/* {this.getCurrentItems().map((item, index)=>{
						return(
							<li key={index} className="itemlist-element">
								<p className='element-lists'>
									<span className="items_name">{item.name}</span>
									<span className="items_date">{item.return_date}</span>
									<span className="More_button">
										<button type="button">More</button>
									</span>
								</p>

							</li>
						)
					})} */}
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
