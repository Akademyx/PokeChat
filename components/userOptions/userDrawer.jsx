import React, { Component } from 'react';
import { render } from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { lchmod } from 'fs';
import UserSettings from './userSettings/userSettings.jsx';
import UserPokemon from './userPokemon/userPokemon.jsx';
import UserTheme from './userTheme/userTheme.jsx';

// undocked 
class userDrawer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  handleClose () {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="My Settings"
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={220}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <UserSettings userDrawerContext={this}></UserSettings>
          <hr></hr>
          <UserPokemon appContext={this.props.appContext} user={this.props.user}></UserPokemon>
          <hr></hr>
          {/* <br></br> */}
          <UserTheme appContext={this.props.appContext} user={this.props.user}></UserTheme>
          <br></br>
          <hr></hr>
          <MenuItem onClick={this.handleClose}>LOG OUT</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default userDrawer;