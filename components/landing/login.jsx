import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './landing.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import axios from 'axios';

// material ui styles
const fieldStyles = {
	colorOrange: {
		color: orange500,
	},
	colorDeepOrange: {
		color: deepOrange500,
	}
}

class Login extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			redirectToChatRoom: false
		};
		this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
	}

	submitLoginCredentials (nameVal, passwordVal, that) {
		if (nameVal === '' || passwordVal === '') alert('please enter a name and password!');
		else {
			axios.post('/checkCredentials', {
				name: nameVal,
				password: passwordVal
			})
			.then(function (response) {
				console.log('LOGIN RESPONSE', response);
				document.getElementById("nameField").value = '', 
				document.getElementById("passwordField").value = ''
				// if response data is an empty string this means the user isnt found in the database. 
				// if is empty, alert the user of incorrect credentials
				if (response.data === '') alert ('incorrect password or username');
				else {
					// re-render and route to chatroom with react router
					let appState = that.props.appContext;	
					// pass user to app (parent) state				
					appState.setState({user: response.data});
					that.setState({redirectToChatRoom: true});
					console.log('APP USER', that.props.user);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
  }
	
	render() {
		// if login credentials come back true, redirect to chatroom:
		if (this.state.redirectToChatRoom === true) return (<Redirect to='/chatroom'/>);
		// otherwise render login page
		else {
		return (
			<div>
				<div className="landingBox">
					<div id="loginForm">
					<TextField
							id="nameField"
							hintText="Name"
							hintStyle={fieldStyles.colorOrange}
						/>
						<TextField
							id="passwordField"
							type="password"
							hintText="Password"
							hintStyle={fieldStyles.colorDeepOrange}
						/>
						<FlatButton label="Login" fullWidth={true} onClick={ () => {
							this.submitLoginCredentials(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
								this
							)
							}}/>
						<FlatButton label='First Time? Sign Up!' containerElement={<Link to="/signup" />} linkButton={true}/>
					</div>
				</div>
			</div>
				)
			}
		}
}

export default Login;