import React, { Component } from "react";
import '../../../App.css';

export default class ItemInterface extends Component {

	constructor(props){
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	};

	handleClick = () => {
    	this.props.toggle();
  	};

  render() {
    return (
    	<>
      	{console.log("popping up")}
        <h1>Popup</h1>
        <button onClick={this.handleClick()}>Close</button>
        </>
    );
  }
}