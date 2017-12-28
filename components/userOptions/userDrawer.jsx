import React, { Component } from 'react';
import { render } from 'react-dom';
import { Redirect } from 'react-router'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { lchmod } from 'fs';
import UserSettings from './userSettings/userSettings.jsx';
import UserPokemon from './userPokemon/userPokemon.jsx';
import UserTheme from './userTheme/userTheme.jsx';
import axios from 'axios';

class userDrawer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      redirectToLogin: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  handleClose () {
    this.setState({open: false});
  }

  handleLogout () {
    this.props.appContext.setState({user: {id: null, name: null, password: null, pokemon: null, themeColor: null, _v: 0, id: null}});
    this.setState({redirectToLogin: true});
    // clearTimeout(this.props.chatRoomContext.setTimeoutID);  
    // setState to end setTimeout recursion in checkForMessageUpdates in chatRoom 
    this.props.chatRoomContext.setState({stopCheckForMessageUpdates: true});
  }

  render() {
    if (this.state.redirectToLogin === true) return (<Redirect to='/'/>);
    else { 
      return (
      <div>
        <div className="btn-wrap-options">
							<a className='landingButtonsChatRoomOptions' 
							onClick={ () => 
								{ this.handleToggle() }}
								>Options</a>
					</div>
        <Drawer
          docked={false}
          width={220}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={ () => {this.handleLogout()}}>LOG OUT</MenuItem>
          <UserSettings userDrawerContext={this}></UserSettings>
          <hr></hr>
          <UserPokemon appContext={this.props.appContext} user={this.props.user}></UserPokemon>
          <hr></hr>
          {/* <br></br> */}
          <UserTheme appContext={this.props.appContext} user={this.props.user}></UserTheme>
          <br></br>
          <hr></hr>
        </Drawer>
      </div>
      );
    }
  }
}

export default userDrawer;