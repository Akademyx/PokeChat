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

// material-ui styles
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
      userColor: null,
      userPokemon: null
		};
    this.signUpUser = this.signUpUser.bind(this);
    this.addColor = this.addColor.bind(this);
    this.addPokemon = this.addPokemon.bind(this);
	}

	signUpUser (nameVal, passwordVal, that) {
    if (this.state.userColor === null) alert('choose a color for your theme!');
    else if (this.state.userPokemon === null) alert('choose a pokemon!');
    else if (nameVal === '' || passwordVal === '') alert('please enter a name and password!');
    else {
      axios.post('/addUser', {
        name: nameVal,
        password: passwordVal,
        pokemon: this.state.userPokemon,
        themeColor: this.state.userColor
      })
      .then(function (response) {
        console.log('SIGN UP RESPONSE', response);
        document.getElementById("nameField").value = '', 
        document.getElementById("passwordField").value = ''
        // if response data is an empty string this means the user isnt found in the database. 
        // if is empty, alert the user of incorrect credentials
        //// REPLACE with material-ui candybar ////
        if (response.data === '') alert ('please enter a password and username');
        ///////////////////////////////////////////
        else {
          let appState = that.props.appContext;	
					// pass user to app (parent) state				
					appState.setState({user: response.data});
          // re-render and route to chatroom with react router
          that.setState({redirectToChatRoom: true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  addColor (color) {
    this.setState({userColor: color});
  }

  addPokemon (pokemon) {
    this.setState({userPokemon: pokemon});
  }
	
	render() {
		// if sign up is successful, redirect to chatroom:
    if (this.state.redirectToChatRoom === true) return (<Redirect to='/chatroom'/>);
		// otherwise render login page
		else {
		return (
			<div>
				<div className="landingBox">
        <br></br>
        <h1>PokeChat</h1>
					<div id="loginForm">
					<TextField
							id="nameField"
							hintText="Choose a Username"
							hintStyle={fieldStyles.colorOrange}
						/>
						<TextField
							id="passwordField"
							type="password"
							hintText="Choose a Password"
							hintStyle={fieldStyles.colorDeepOrange}
						/>
						<FlatButton label="Sign Up" fullWidth={true} onClick={ () => {
							this.signUpUser(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
								this
							)
							}}/>
              <FlatButton label='Already a PokeChat User?' fullWidth={true} containerElement={<Link to="/" />} linkButton={true}/>
					</div>
          <div id="pokemonWrapper">
            <button id='charmander' onClick={ () => { this.addPokemon('https://media.giphy.com/media/aa8oyloCKilLW/giphy.gif') }}></button>
            <button id='squirtle' onClick={ () => { this.addPokemon('https://seeklogo.com/images/S/squirtle-logo-0E4AE193EE-seeklogo.com.png') }}></button>
            <button id='pikachu' onClick={ () => { this.addPokemon('https://i.pinimg.com/originals/65/95/7d/65957d802d9046d0d8d9e13ceb3e8e6d.gif') }}></button>
            <button id='bulbasaur' onClick={ () => { this.addPokemon('http://pa1.narvii.com/5707/3ab7eaf896208ff835c71ec323627db336ba222b_00.gif') }}></button>
            <button id='jigglypuff' onClick={ () => { this.addPokemon('https://media.giphy.com/media/fYYVe1rP4oaHe/giphy.gif') }}></button>
          </div>
          <br></br>
          <div id="colorWrapper">
            <button id='red' onClick={ () => { this.addColor('rgb(206, 91, 91)') }}></button>
            <button id='blue' onClick={ () => { this.addColor('rgb(92, 149, 245)') }}></button>
            <button id='green' onClick={ () => { this.addColor('rgb(121, 176, 121)') }}></button>
            <button id='purple' onClick={ () => { this.addColor('rgb(148, 81, 148)') }}></button>
            <button id='orange' onClick={ () => { this.addColor('rgb(240, 184, 87)') }}></button>
          </div>
				</div>
			</div>
				)
			}
		}
}

export default SignUp;