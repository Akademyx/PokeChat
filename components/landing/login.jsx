import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './landing.css'
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
							this.props.submitLoginCredentials(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
							this.props.parentContext)
							}}/>
					</div>
				</div>
			</div>
				)
		}
}

export default Login;