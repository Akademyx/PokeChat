import React, { Component } from 'react'
import { render } from 'react-dom'

class ChatRoom extends Component {
  constructor(props, context) {
	super(props, context);
    
  }
  
	render() {
  	return (
    	<div id="testChatRoomRenderDiv">{'CHAT ROOM'}</div>
    	)
  }
}

export default ChatRoom;