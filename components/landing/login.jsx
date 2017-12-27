import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './landing.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
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
			redirectToChatRoom: false,
			open: false
		};
		this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
	}

	// componentDidMount () {
	// 	console.log('USER: ' , this.props.appContext.state.user);
	// }

	submitLoginCredentials (nameVal, passwordVal, that) {
		if (nameVal === '' || passwordVal === '') that.handleClick();
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

				if (response.data === '') that.handleClick();

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

	handleClick () {
		this.setState({
			open: true,
		})
	}
	
	handleRequestClose () {
    this.setState({
      open: false,
    });
  };
	
	render() {
		// if login credentials come back true, redirect to chatroom:
		if (this.state.redirectToChatRoom === true) return (<Redirect to='/chatroom'/>);
		// otherwise render login page
		else {
		return (
			<div>
				<div className="landingBox">
				<br></br>
				<h1>Pokechat</h1>
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
						{/* <div id='btn-wrapper-wrapper'> */}
						<div className="btn-wrap">
							<a className='landingButtons' onClick={ () => { this.submitLoginCredentials(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
								this
							) }}>Login</a>
						</div>

							<div id="btn-wrap">
								<Link to='/signUp'>
							{/* <Link to="/signup" id='link'>See The Form Demo</Link> */}
  								<a className='landingButtons' type='button' linkButton={true}>Sign Up</a>
								</Link>
 							</div>
						{/* </div> */}
						{/* <FlatButton label='First Time? Sign Up!' fullWidth={true} containerElement={<Link to="/signup" />} linkButton={true}/> */}
						<Snackbar
            open={this.state.open}
            message="Please Enter A Correct Name and Password"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
					</div>
					{/* <img id='runningPikachu' src='http://rs803.pbsrc.com/albums/yy320/Darkmadkitsune/stickers_43b26a39d46182afd53aaaf9a8.gif~c200'></img> */}
				</div>
			</div>
				)
			}
		}
}

export default Login;


// <FlatButton label="Login" fullWidth={true} onClick={ () => {
						// 	this.submitLoginCredentials(
						// 		document.getElementById("nameField").value, 
						// 		document.getElementById("passwordField").value, 
						// 		this
						// 	)
							// }}/>


							