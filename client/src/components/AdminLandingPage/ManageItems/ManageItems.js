import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import AdminBar from '../AdminBar/AdminBar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/items'
})

class ManageItems extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      seen:-1,
      new_type: "",
      new_desc: "",
      errors: ""
    };
  };

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

  componentDidMount(){
    this.findAllItems();
  };

  findAllItems = async() => {
    let data = await api.get('/').then( ({data}) => data);
    data = data.filter(function(e) { return e.borrowed === false })
    this.setState({items : data});
  };


  createItem = async(type, description) => {
    await api.post('/',{
      type: type,
      description: description,
      borrowed: false
    });
    this.findAllItems();
  }

  deleteItem = async(id) =>{
    await api.delete(`/${id}`);
    this.findAllItems();
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

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if(this.state.new_type==="" || this.state.new_desc===""){
      this.setState({
        errors: "Invalid input: enter an item type and description.",
        new_type: "",
        new_desc: ""
      });
      return null;
    }

    this.createItem(this.state.new_type, this.state.new_desc);
    this.setState({
      new_type: "",
      new_desc: ""
    })
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
          <AdminBar/>
        </div>
        <div className = 'content'>
	          <div className='component-container'>
				<div className='component-header'>
          <div>
            <p className='component-title'>Create a new item:</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.new_type}
                  placeholder = 'Item type'
                  id="new_type"
                  type="text"
                />
                <input
                  onChange={this.onChange}
                  value={this.state.new_desc}
                  placeholder = 'Item description'
                  id="new_desc"
                  type="text"
                />
                <button className = 'checkout-button'
                    type="submit"
                  >
                  Create
                </button>
              </div>
            </form>
            {this.state.errors}
          </div>

          <div className='current-list'>
            <span className= 'sub-title'>All current items:</span>
            {this.state.items.map(item =>
              <div className = 'manageitem-list' key={item._id}> 
                <span >{item.type}</span>
                <span className='manageitem-btn'><button className='item-button_btn' onClick={() => this.deleteItem(item._id.toString())}>Delete</button>
                <button className='item-button_btn' onClick={()=>this.togglePop(item._id.toString())}>More</button></span>
                
                {this.state.seen===item._id ? 
                  <div className="dropdown">
                    <span className="dashboard-item_description">{item.description}</span>
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

ManageItems.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  usr: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  usr: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ManageItems);