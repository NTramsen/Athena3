import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import '../UserLandingPage.css';
import NavBar from '../NavBar/NavBar';

class Items extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    };
	};

	getCurrentItems(){
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
    //const { user } = this.props.auth;

    return (
      <div className = 'main-container'>
        <div className = 'top-banner'>
          <h1>Welcome Neil Tramsen</h1>
        </div>
        <div className = 'navbar'>
          <NavBar/>
        </div>
        <div className = 'content'>
	      <div className='items-container'>
			<div className='items-header'>
				<p>Your item history</p>
			</div>
			<div className='current-list'>
				<p>Current items:</p>
				<ul>
					{this.getCurrentItems().map((item, index)=>{
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
					{this.getPastItems().map((item, index)=>{
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Items);