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

  state = {
    checkouts: [],
    overdues: []
  };

  constructor(props){
    super(props);
  };

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  componentDidMount(){
    this.findAllCheckouts();
  };

  findAllCheckouts = async() => {
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
          if(item_data.dueDate && dueDate<today){
            overdues.push({
              name: data[i].name,
              user_id: data[i]._id,
              type: item_data.type,
              description: item_data.description,
              item_id: item_data._id,
              dueDate: item_data.dueDate
            });
          }
          else{
            checkouts.push({
              name: data[i].name,
              user_id: data[i]._id,
              type: item_data.type,
              description: item_data.description,
              item_id: item_data._id,
              dueDate: item_data.dueDate
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
    console.log("userID: " + userid);
    console.log("itemid: " + itemid);
    let data = api.put('users/removeitem', {id: userid, item: itemid}).then( response => {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });

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
            <span>View currently checked-out items:</span>
            {this.state.checkouts.map(checkout =>
              <div key={checkout.item_id}>
                <span>User:</span>
                {checkout.name}
                {checkout.type}
                {checkout.dueDate? checkout.dueDate : null}
                <button onClick={()=>this.returnItem(checkout.user_id, checkout.item_id)}>Return item</button>
              </div>
            )}
          </div>
          <div>
            <span>View over-due items:</span>
            {this.state.overdues.map(checkout =>
              <div key={checkout.item_id}>
                <span>User:</span>
                {checkout.name}
                {checkout.type}
                <button onClick={()=>this.returnItem(checkout.user_id, checkout.item_id)}>Return item</button>
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
