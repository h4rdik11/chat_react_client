import React, { Component } from 'react';
import { connect } from 'react-redux';
import {doLogin, onTextChange}  from '../../actions/LoginActions';
import '../../styles/login_styles.css';

class Login extends Component{
	constructor(props){
		super(props);
		this.onTextChange = this.onTextChange.bind(this);
		this.onLogin = this.onLogin.bind(this);
	}

	onLogin(e){
		e.preventDefault();
		console.log("onLogin inside component");
		const data = {
			email: this.props.userDetails.email,
			password: this.props.userDetails.password
		}
		this.props.onLogin(data);
	}

	onTextChange(e){
		e.preventDefault();
		const field = e.target.type;
		const value = e.target.value;
		const data = {
			"field" : field,
			"value" : value
		};
		this.props.onTextChange(data);
	} 

	render(){
		return (
			<React.Fragment>
				<form onSubmit={this.onLogin}>
				<div className="row main__row">
					<div className="col-md-4"></div>
					<div className="col-md-4">
						<div className="form-group">
								<label>Email address</label>
								<input type="email" className="form-control" onChange={this.onTextChange} placeholder="Enter email" />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" onChange={this.onTextChange} placeholder="Password" />
						</div>  
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
					<div className="col-md-4"></div>
				</div>
				</form>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userDetails: state.loginDetails.userDetails,
		isLoggedIn: state.loginDetails.isLoggedIn
	};
}

const mapDispathToProps = (dispatch) => {
	return {
		onLogin: (data) => dispatch(doLogin(data)),
		onTextChange: (data) => dispatch(onTextChange(data))
	};
}

export default connect(mapStateToProps, mapDispathToProps)(Login);