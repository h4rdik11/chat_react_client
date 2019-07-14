import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from 'react-redux';
import {getLoginDetails} from './actions/LoginActions';
import {goOffline} from './actions/DashboardActions'

import Login from './components/Login/';
import Dashboard from './components/Dashboard';

class App extends Component {
  
  componentDidMount(){
    this.props.getLoginDetails();
    window.addEventListener("unload", () => {
      this.props.goOffline(this.props.userDetails._id);  
    });
  }
  
  render(){
    return (
      <Router>
        {
          this.props.isLoggedIn === false ? 
            <Redirect to="/login"/> : 
            <Redirect to="/dashboard"/> 
        }
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.loginDetails.userDetails,
    isLoggedIn: state.loginDetails.isLoggedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getLoginDetails: () => dispatch(getLoginDetails()),
    goOffline: (id) => dispatch(goOffline(id))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
