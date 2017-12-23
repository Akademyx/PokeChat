import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lchmod } from 'fs';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import styles from './userPokemon.css';

// undocked 
class userPokemon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClick () {
    this.setState({
      open: true,
    });
  };

  handleRequestClose () {
    this.setState({
      open: false,
    });
  };

  render() {
    
    return (
      <div>
        <div id='textFieldWrapper'>
          <h4 id="choosePokemonHeader">{'Choose a Different Pokemon'}</h4>
          <div id="pokemonWrapperUserDrawer">
            <button id='charmander' onClick={ () => { this.addPokemon('https://vignette.wikia.nocookie.net/pokemon/images/4/41/004Charmander_OS_anime_2.png/revision/latest?cb=20140603214909') }}></button>
            <button id='squirtle' onClick={ () => { this.addPokemon('squirtle') }}></button>
            <button id='raichu' onClick={ () => { this.addPokemon('raichu') }}></button>
            <button id='bulbasaur' onClick={ () => { this.addPokemon('bulbasaur') }}></button>
            <button id='onyx' onClick={ () => { this.addPokemon('onyx') }}></button>
          </div>
          <FlatButton
            onClick={this.handleClick}
            label="Choose Pokemon"
          />
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