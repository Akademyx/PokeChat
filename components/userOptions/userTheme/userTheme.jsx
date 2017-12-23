import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lchmod } from 'fs';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import styles from './userTheme.css';

// undocked 
class userTheme extends Component {

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
          <h4 id="chooseThemeHeader">{'Select Another Theme'}</h4>
          <div id="colorWrapperUserDrawer">
            <button id='red' onClick={ () => { this.addColor('rgb(206, 91, 91)') }}></button>
            <button id='blue' onClick={ () => { this.addColor('rgb(92, 149, 245)') }}></button>
            <button id='green' onClick={ () => { this.addColor('rgb(121, 176, 121)') }}></button>
            <button id='purple' onClick={ () => { this.addColor('rgb(148, 81, 148)') }}></button>
            <button id='orange' onClick={ () => { this.addColor('rgb(240, 184, 87)') }}></button>
          </div>
          {/* <FlatButton
            onClick={this.handleClick}
            label="Select Theme"
          /> */}
          <Snackbar
            open={this.state.open}
            message="New Theme Selected"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          </div>
      </div>
    );
  }
}

export default userTheme;