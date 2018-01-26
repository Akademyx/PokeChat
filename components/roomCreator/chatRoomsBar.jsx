import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './chatRoomsBar.css';
import axios from 'axios';

function gatherUserChatRooms () {
  let userChatRooms = [];
  for (let i = 0; i < this.props.user.userChatRooms.length; i++) {
    <div>
      <div style={
        {size: '11', color: 'darkGrey'}}>
        {this.props.user.userChatRooms[i].roomName}
      </div>
      <div style={
        {backgroundImage: 'url(' + this.props.user.userChatRooms[i].image + ')', width: '100px', height: '100px'}}>
      </div>
    </div>
  }
}


class roomCreator extends Component {
  constructor(props, context) {
  super(props, context);

  }
  render() {
    return (
      <div>
        <div>
          {userChatRooms}
        </div>
      </div>
    )
  }
}
