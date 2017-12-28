import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lchmod } from 'fs';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import styles from './userPokemon.css';
import axios from 'axios';

class userPokemon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.updateUserPokemon = this.updateUserPokemon.bind(this);
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  };

  updateUserPokemon (newPokemon, that) {
    axios.post('/updateUser', {
      propertyToUpdate: 'pokemon',
      newPropertyValue: newPokemon,
      id: that.props.user._id,
    })
    .then(function (response) {
      console.log('RESPONSE IN UPDATE USER POKEMON', response);
      // set state of app level user to response.data object
      that.props.appContext.setState({user: response.data});
      that.setState({open: true});
    })
    .catch(function (error) {
      console.log(error);
      console.log('ERROR IN UPDATE USER METHOD');
    })
  }

  render() {
    
    return (
      <div>
        <div id='textFieldWrapper'>
          <h4 id="choosePokemonHeader">{'Choose a Different Pokemon'}</h4>
          <div id="pokemonWrapperUserDrawer">
            <button id='charmander' onClick={ () => { this.updateUserPokemon('https://media.giphy.com/media/aa8oyloCKilLW/giphy.gif', this) }}></button>
            <button id='squirtle' onClick={ () => { this.updateUserPokemon('squirtle', this) }}></button>
            <button id='raichu' onClick={ () => { this.updateUserPokemon('raichu', this) }}></button>
            <button id='bulbasaur' onClick={ () => { this.updateUserPokemon('bulbasaur', this) }}></button>
            <button id='onyx' onClick={ () => { this.updateUserPokemon('onyx', this) }}></button>
          </div>
          <Snackbar
            open={this.state.open}
            message="New Pokemon Chosen"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          </div>
      </div>
    );
  }
}

export default userPokemon;