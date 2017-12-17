import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './landing.css'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
// import {orange500, blue500} from 'material-ui/styles/colors';
import axios from 'axios';

class Login extends Component {
    constructor(props, context) {
      super(props, context);
    
		}

    render() {
        return (
				<div>
        {/* <div>{'LOGIN'}</div> */}
				<div className="landingBox">
					<div id="loginForm">
						<TextField
							id="nameField"
							hintText="Name"
							hintStyle={styles.errorStyle}
						/>
						<TextField
							id="passwordField"
							hintText="Password"
							hintStyle={styles.errorStyle}
						/>
						<FlatButton label="Login" fullWidth={true} onClick={this.props.submitLoginCredentials}/>
					</div>
					</div>
				</div>
        )
      }
  }

export default Login;