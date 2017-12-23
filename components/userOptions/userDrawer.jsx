import React, { Component } from 'react';
import { render } from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { lchmod } from 'fs';

class DrawerUndockedExample extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // handleToggle = () => this.setState({open: !this.state.open});

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  // handleClose = () => this.setState({open: false});

  handleClose () {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Open Drawer"
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>My Settings</MenuItem>
          <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default DrawerUndockedExample;