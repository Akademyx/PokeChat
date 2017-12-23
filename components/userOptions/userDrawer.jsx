import React, { Component } from 'react';
import { render } from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { lchmod } from 'fs';
import UserSettings from './userSettings/userSettings.jsx';
import UserPokemon from './userPokemon/userPokemon.jsx';

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
        {/* <MenuItem onClick={this.handleToggle}>My Settings</MenuItem> */}
        <Drawer
          docked={false}
          width={220}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          {/* <MenuItem onClick={this.handleClose}>My Settings</MenuItem> */}
          <UserSettings userDrawerContext={this}></UserSettings>
          <hr></hr>
          <UserPokemon></UserPokemon>
          <hr></hr>
          <br></br>
          <br></br>
          <hr></hr>
          <MenuItem onClick={this.handleClose}>LOG OUT</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default userDrawer;