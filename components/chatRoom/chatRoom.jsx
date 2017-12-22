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
		this.addMessage = this.addMessage.bind(this);
	}

	addMessage (message, that) {
		axios.post('/addMessage', {
			message: message,
			name: that.props.user.name,
			password: that.props.user.password,
			pokemon: that.props.user.pokemon,
			themeColor: that.props.user.themeColor,
		})
		.then(function (response) {
			console.log('MESSAGE ADD RESPONSE', response);
		})
		.catch(function (error) {
			console.log(error);
		});
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
	}

	// componentDidUpdate () {
	// 	console.log('STATE', this.state.users);
	// }
  
	render() {
		let displayUsers = [];
		for (let i = 0; i < this.state.users.length; i++) {
			// if users id equals state user's id
			if (this.state.users[i]._id === this.props.user._id) {
				let styles = {
					backgroundColor: this.state.users[i].themeColor,
					minWidth: '30px',
					maxWidth: '60%',
					overflowWrap: 'break-word',
					display: 'inline-block',
					borderRadius: '15px',
					padding: '10px',
					marginRight: '10px',
					marginTop: '7px',
					marginBottom: '7px',
					float: 'right'
				}
				let spanStyle = {
					float: 'right',
					padding: '17px'
				}
				displayUsers.push(<div><div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div><span style={ spanStyle }>{ this.state.users[i].name }</span></div>,<br></br>);
			}
			// else
			else {
				let styles = {
					backgroundColor: this.state.users[i].themeColor,
					minWidth: '30px',
					maxWidth: '60%',
					overflowWrap: 'break-word',
					display: 'inline-block',
					borderRadius: '15px',
					padding: '10px',
					marginRight: '10px',
					marginTop: '7px',
					marginBottom: '7px',
				}
				displayUsers.push(<div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div>,<span>{ this.state.users[i].name }</span>,<br></br>);
			}
		}

		let headerStyle = {
			position: 'fixed',
			zIndex: '1',
			width: '100%',
			height: '60px',
			// centers text vertically:
			lineHeight: '60px',
			textAlign: 'center',
			border: '1px solid',
			backgroundColor: this.props.user.themeColor
		}

  	return (
			<div>
				{/* <div id="testChatRoomRenderDiv">{ 'CHAT ROOM' }</div> */}
				<header id='chatHeader' style={ headerStyle }>{ 'POKE CHAT' }</header>
				<div id='usersContainer'>{ displayUsers }</div>
				<div id='chatFooter'>
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
			</div>
    	)
  }
}

export default ChatRoom;