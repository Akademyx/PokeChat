import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/TextField';

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
			let allUsers = [];
			for ( let i = 0; i < response.data.length; i++ ) {
				console.log(response.data[i].name);
				allUsers.push(response.data[i]);
			}
			that.setState({users: allUsers});
		})
		.catch(function (error) {
			console.log(error);
		});
	}



	componentDidMount () {
		this.getUsers(this);
		console.log('PROPS FROM APP', this.props);
	}

	componentDidUpdate () {
		console.log('STATE', this.state.users);
	}
  
	render() {
		let displayUsers = [];
		for (let i = 0; i < this.state.users.length; i++) {
			let styles = {
				backgroundColor: this.state.users[i].themeColor
			}
			displayUsers.push(<div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div>);
		}
  	return (
			<div>
    		<div id="testChatRoomRenderDiv">{ 'CHAT ROOM' }</div>
				<div id="testUsers">{ displayUsers }</div>
				<TextField
							id="messageField"
							hintText="message"
						/>
						<FlatButton label="Login" fullWidth={true} onClick={ () => {
							this.addMessage(
								document.getElementById("messageField").value, 
								this
							)
							}}/>
			</div>
    	)
  }
}

export default ChatRoom;