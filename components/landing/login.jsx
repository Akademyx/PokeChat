import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './landing.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {orange500, deepOrange500, green500} from 'material-ui/styles/colors';
import axios from 'axios';

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
		this.state = {};
		this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
	}

	submitLoginCredentials (nameVal, passwordVal) {
    axios.post('/checkCredentials', {
      name: nameVal,
      password: passwordVal
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("nameField").value = '', 
      document.getElementById("passwordField").value = ''
      // response data is an empty string this means the user isnt found in the database. 
      // alert the user of incorrect credentials
      if (response.data === '') alert ('incorrect password or username');
			// else that.setState({showLogin: 'none'});
			else {
				axios.post('/checkCredentials', {})
			}
    })
    .catch(function (error) {
      console.log(error);
    });
  }
	
	render() {
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
							)
							}}/>
					</div>
					<li><Link to='/chatroom'>ChatRoom</Link></li>
				</div>
			</div>
				)
		}
}

export default Login;