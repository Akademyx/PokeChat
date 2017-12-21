import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/TextField';
import styles from './chatRoom.css';

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
				backgroundColor: this.state.users[i].themeColor,
				minWidth: '30px',
				maxWidth: '60%',
				overflowWrap: 'break-word',
				display: 'inline-block',
				borderRadius: '25px',
				padding: '10px',
				marginRight: '10px',
				marginBottom: '15px'
			}
			displayUsers.push(<div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div>,<span>{ this.state.users[i].name }</span>,<br></br>);
		}

		let headerStyle = {
			position: 'fixed',
			zIndex: '1',
			width: '100%',
			height: '70px',
			textAlign: 'center',
			border: '1px solid',
			backgroundColor: this.props.user.themeColor
		}

  	return (
			<div>
				{/* <div id="testChatRoomRenderDiv">{ 'CHAT ROOM' }</div> */}
				<header id='chatHeader' style={ headerStyle }>{ 'POKE CHAT' }</header>
				<div id="usersContainer">{ displayUsers }</div>
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