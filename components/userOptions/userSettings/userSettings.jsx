import React, { Component } from 'react';
import { render } from 'react-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { lchmod } from 'fs';
import {orange500, deepOrange500 } from 'material-ui/styles/colors';
import styles from './userSettings.css';

// undocked 
class userSettings extends Component {

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
    const fieldStyles = {
      colorOrange: {
        color: orange500,
      },
      colorDeepOrange: {
        color: deepOrange500,
      },
    }

    return (
      <div>
        <div id='textFieldWrapper'>
          <h4>{'Change Password'}</h4>
          <TextField
            id="newPassword"
            type="password"
            hintText="New Password"
            hintStyle={fieldStyles.colorOrange}
          />
          <TextField
            id="newPasswordConfirm"
            type="password"
            hintText="Confirm New Password"
            hintStyle={fieldStyles.colorOrange}
          />
          <FlatButton
            onClick={this.handleClick}
            label="Reset Password"
          />
          <Snackbar
            open={this.state.open}
            message="Password Reset"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          </div>
      </div>
    );
  }
}

export default userSettings;