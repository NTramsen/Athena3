import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h2>
              <span>Welcome to </span>
              <span style={{color:'#f2a900'}}>Athena </span>
             
            </h2>
            <h5>
            the easy to use inventory management system
            </h5>
            <h5 style={{
              color:'gray',
              fontStyle:'italic'
            }}>
            -Easily Search Items
            </h5>
            
            <h5 style={{
              color:'gray',
              fontStyle:'italic'
            }}>
              -Fast Check Out Items
            </h5>
            
            <h5 style={{
              color:'gray',
              fontStyle:'italic'
            }}>
            -Efficiently Manage Your Items
            </h5>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
