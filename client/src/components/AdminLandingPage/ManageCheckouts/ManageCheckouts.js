import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios';
import '../../../App.css';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
})

class ManageCheckouts extends Component {

  constructor(props){
    super(props);
    this.state = {
      checkouts: [],
      overdues: []
    }
  };

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  componentDidMount(){
    this.findAllCheckouts();
  };

  findAllCheckouts = async() => {

    console.log("Finding checkouts");
    let data = await api.get('/users/').then( ({data}) => data);
    data = data.filter(user=>user.items.length>0);
  
    var checkouts = [];
    var overdues = [];
    for(var i=0; i<data.length; i++){
      for(var j=0; j<data[i].items.length; j++){
        let item_data = await api.get(`/items/${data[i].items[j]}`).then((response)=>{
          return response.data;
        });
        if(item_data){
          var today = new Date();
          var dueDate = new Date(item_data.dueDate);

          var dd = dueDate.getDate();
          var mm = dueDate.getMonth()+1; 
          var yyyy = dueDate.getFullYear();
          if(dd<10) dd='0'+dd;
          if(mm<10) mm='0'+mm;
          var saveDate = mm+'/'+dd+'/'+yyyy;

          if(item_data.dueDate && dueDate<today){
            overdues.push({
              name: data[i].name,
              user_id: data[i]._id,
              type: item_data.type,
              description: item_data.description,
              item_id: item_data._id,
              dueDate: saveDate
            });
          }
          else{
            checkouts.push({
              name: data[i].name,
              user_id: data[i]._id,
              type: item_data.type,
              description: item_data.description,
              item_id: item_data._id,
              dueDate: saveDate
            });
          }
        }
      }
    }
    this.setState({
      checkouts: checkouts,
      overdues: overdues
    });
  };

  returnItem = async(userid, itemid) =>{
    //var response;
    api.put('users/removeitem', {id: userid, item: itemid}).then( response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });

    window.location.reload(false);

  }

  render() {
    const user = this.props.usr.user;
    const info = Object.values(user);

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          Welcome {info[1]}
        </div>
        <div className = 'navbar'>
          <AdminBar/>
        </div>
        <div className = 'content'>
	          <div className='component-container'>
				<div className='component-header'>
        <p className='component-title'>Manage Checkout</p>
        </div>
       

        <div>
            <p className='sub-title'>View currently checked-out items:</p>
            <div className='managecheckout_header'>
              <span className="managecheckout_header_style1">User Name</span>
              <span className="managecheckout_header_style2">Item Name</span>
              <span className="managecheckout_header_style3">Due Date</span>
			    	</div>
            {this.state.checkouts.map(checkout =>
              <div className='managecheckout_list' key={checkout.item_id}>
                <span className="managecheckout_name">{checkout.name}</span>
							  <span className="managecheckout_item">{checkout.type}</span> 
                <span className="managecheckout_date">{checkout.dueDate? checkout.dueDate.substring(0,10) : null}</span> 
                <span className="managecheckout_button"><button className='item-button_btn' onClick={()=>this.returnItem(checkout.user_id, checkout.item_id)}>Return item</button></span>               
              </div>
            )}
          </div>
          <div>
          <p className='sub-title'>View over-due items:</p>
          <div className='managecheckout_header'>
              <span className="managecheckout_header_style1">User Name</span>
              <span className="managecheckout_header_style2">Item Name</span>
			    	</div>
            {this.state.overdues.map(checkout =>
              <div className='managecheckout_list' key={checkout.item_id}>
                <span className="managecheckout_name">{checkout.name}</span>
							  <span className="managecheckout_item">{checkout.type}</span> 
                <span className="managecheckout_date">{checkout.dueDate? checkout.dueDate.substring(0,10) : null}</span> 
                <span className="managecheckout_button"><button className='item-button_btn' onClick={()=>this.returnItem(checkout.user_id, checkout.item_id)}>Return item</button></span>                        
              </div>
            )}   
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

ManageCheckouts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageCheckouts);
