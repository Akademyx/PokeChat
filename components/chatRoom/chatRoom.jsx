import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class ChatRoom extends Component {
  constructor(props, context) {
	super(props, context);
    this.state = {
			users: []
		}
		this.getUsers = this.getUsers.bind(this);
	}
	
	getUsers (that) {
		axios.get('/getUsers', {
		})
		.then(function (response) {
			console.log(response.data);
			// set state.users to the response.
			let allUsers = [];
			for ( let i = 0; i < response.data.length; i++ ) {
				console.log(response.data[i].name);
				allUsers.push(response.data[i].name);
			}
			// that.setState({users: response.data});
			that.setState({users: allUsers});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	componentDidMount () {
		this.getUsers(this);
	}

	componentDidUpdate () {
		console.log('STATE', this.state.users);
	}
  
	render() {
		let displayUsers = [];
		for (let i = 0; i < this.state.users.length; i++) {
			displayUsers.push(<div>{this.state.users[i]}</div>);
		}
  	return (
			<div>
    		<div id="testChatRoomRenderDiv">{'CHAT ROOM'}</div>
				<div id="testUsers">{ displayUsers }</div>
			</div>
    	)
  }
}

export default ChatRoom;