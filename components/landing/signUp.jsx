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

const fieldStyles = {
	colorOrange: {
		color: orange500,
	},
	colorDeepOrange: {
		color: deepOrange500,
	}
}

class SignUp extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
      redirectToChatRoom: false,
      userColor: null
		};
    this.signUpUser = this.signUpUser.bind(this);
    this.addColor = this.addColor.bind(this);
	}

	signUpUser (nameVal, passwordVal, that) {
    axios.post('/addUser', {
      name: nameVal,
      password: passwordVal,
      pokemon: pokemonVal,
      themeColor: themeColorVal
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("nameField").value = '', 
      document.getElementById("passwordField").value = ''
      // if response data is an empty string this means the user isnt found in the database. 
      // if is empty, alert the user of incorrect credentials
      if (response.data === '') alert ('incorrect password or username');
			else {
				// re-render and route to chatroom with react router
				that.setState({redirectToChatRoom: true});
			}
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addColor (color) {
    this.setState({userColor: color});
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
						<FlatButton label="Sign Up" fullWidth={true} onClick={ () => {
							this.submitLoginCredentials(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
								this
							)
							}}/>
							<li><Link to='/login'>Already a PokeChat user? Login!</Link></li>
              <button id='red' onClick={ () => { this.addColor('red') }}></button>
              <button id='blue' onClick={ () => { this.addColor('blue') }}></button>
              <button id='green' onClick={ () => { this.addColor('green') }}></button>
              <button id='purple' onClick={ () => { this.addColor('purple') }}></button>
              <button id='orange' onClick={ () => { this.addColor('orange') }}></button>
					</div>
				</div>
			</div>
				)
			}
		}
}

export default SignUp;