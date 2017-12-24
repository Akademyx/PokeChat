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
        console.log(response);
        document.getElementById("nameField").value = '', 
        document.getElementById("passwordField").value = ''
        // if response data is an empty string this means the user isnt found in the database. 
        // if is empty, alert the user of incorrect credentials
        if (response.data === '') alert ('incorrect password or username');
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
							this.signUpUser(
								document.getElementById("nameField").value, 
								document.getElementById("passwordField").value, 
								this
							)
							}}/>
              <FlatButton label='Already a PokeChat User?' containerElement={<Link to="/" />} linkButton={true}/>
					</div>
          <div id="pokemonWrapper">
            <button id='charmander' onClick={ () => { this.addPokemon('https://vignette.wikia.nocookie.net/pokemon/images/4/41/004Charmander_OS_anime_2.png/revision/latest?cb=20140603214909') }}></button>
            <button id='squirtle' onClick={ () => { this.addPokemon('https://seeklogo.com/images/S/squirtle-logo-0E4AE193EE-seeklogo.com.png') }}></button>
            <button id='raichu' onClick={ () => { this.addPokemon('http://vignette3.wikia.nocookie.net/roblox-pokemon-project/images/3/33/Raichu-wallpaper.png/revision/latest?cb=20161110022821') }}></button>
            <button id='bulbasaur' onClick={ () => { this.addPokemon('https://vignette.wikia.nocookie.net/pokemon/images/b/b8/001Bulbasaur_Dream.png/revision/latest?cb=20140903033758') }}></button>
            <button id='onyx' onClick={ () => { this.addPokemon('https://pre00.deviantart.net/959a/th/pre/f/2016/075/4/6/095_onix_by_rayo123000-d9vbjj3.png') }}></button>
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