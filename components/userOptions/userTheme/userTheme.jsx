import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lchmod } from 'fs';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import styles from './userTheme.css';
import axios from 'axios';

class userTheme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.updateUserTheme = this.updateUserTheme.bind(this);
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  };

  updateUserTheme (newTheme, that) {
    axios.post('/updateUser', {
      propertyToUpdate: 'themeColor',
      newPropertyValue: newTheme,
      id: that.props.user._id,
    })
    .then(function (response) {
      console.log(response);
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
          <h4 id="chooseThemeHeader">{'Select Another Theme'}</h4>
          <div id="colorWrapperUserDrawer">
            <button id='red' onClick={ () => { this.updateUserTheme('rgb(206, 91, 91)', this) }}></button>
            <button id='blue' onClick={ () => { this.updateUserTheme('rgb(92, 149, 245)', this) }}></button>
            <button id='green' onClick={ () => { this.updateUserTheme('rgb(121, 176, 121)', this) }}></button>
            <button id='purple' onClick={ () => { this.updateUserTheme('rgb(148, 81, 148)', this) }}></button>
            <button id='orange' onClick={ () => { this.updateUserTheme('rgb(240, 184, 87)', this) }}></button>
          </div>
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