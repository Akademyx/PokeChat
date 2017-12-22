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
			// users: []
			messages: [],
			renderedMessageCount: 0
		}
		// this.getUsers = this.getUsers.bind(this);
		this.getMessages = this.getMessages.bind(this);		
		this.addMessage = this.addMessage.bind(this);
		this.checkForMessageUpdates = this.checkForMessageUpdates.bind(this);
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

	getMessages (that) {
		axios.get('/getMessages', {
		})
		.then(function (response) {
			console.log(response.data);
			let allMessages = [];
			for ( let i = 0; i < response.data.length; i++ ) {
				console.log(response.data[i].message);
				allMessages.push(response.data[i]);
			}
			that.setState({messages: allMessages});
			// may or may not update because of asynchronous calls? Or will because React bunches them?
			that.setState({renderedMessageCount: response.data.length});
		})
		.catch(function (error) {
			console.log('GET MESSAGES ERROR', error);
		});
	}

	componentDidMount () {
		this.getMessages(this);		
		setInterval(this.checkForMessageUpdates, 100);	
	}

	componentDidUpdate () {
		console.log('chatRoom Updated');
	}

	checkForMessageUpdates () {
		// this.getMessages(this);
		// console.log('check for new messages');
		let that = this;
		axios.get('/checkForUpdates', {
		})
		.then(function (response) {
			console.log(response.data);
			if(response.data.length > that.state.renderedMessageCount) that.getMessages(that);
		})
		.catch(function (error) {
			console.log('CHECK UPDATES ERROR', error);
		});
	}
  
	render() {
		let displayMessages = [];
		for (let i = 0; i < this.state.messages.length; i++) {
			// if messages user name equals state user's name
			if (this.state.messages[i].name === this.props.user.name) {
				let styles = {
					backgroundColor: this.state.messages[i].themeColor,
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
				// displayMessages.push(<div><div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div><span style={ spanStyle }>{ this.state.messages[i].name }</span></div>,<br></br>);
				displayMessages.push(<div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span style={ spanStyle }>{ this.state.messages[i].name }</span>,<br></br>);				
			}
			// else
			else {
				let styles = {
					backgroundColor: this.state.messages[i].themeColor,
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
				displayMessages.push(<div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span>{ this.state.messages[i].name }</span>,<br></br>);
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
				<div id='usersContainer'>{ displayMessages }</div>
				<div id='chatFooter'>
					<TextField
						id="messageField"
						hintText="message"
					/>
					<FlatButton label="Add Message" fullWidth={true} onClick={ () => {
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


// let displayUsers = [];
// for (let i = 0; i < this.state.users.length; i++) {
// 	// if users id equals state user's id
// 	if (this.state.users[i]._id === this.props.user._id) {
// 		let styles = {
// 			backgroundColor: this.state.users[i].themeColor,
// 			minWidth: '30px',
// 			maxWidth: '60%',
// 			overflowWrap: 'break-word',
// 			display: 'inline-block',
// 			borderRadius: '15px',
// 			padding: '10px',
// 			marginRight: '10px',
// 			marginTop: '7px',
// 			marginBottom: '7px',
// 			float: 'right'
// 		}
// 		let spanStyle = {
// 			float: 'right',
// 			padding: '17px'
// 		}
// 		displayUsers.push(<div><div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div><span style={ spanStyle }>{ this.state.users[i].name }</span></div>,<br></br>);
// 	}
// 	// else
// 	else {
// 		let styles = {
// 			backgroundColor: this.state.users[i].themeColor,
// 			minWidth: '30px',
// 			maxWidth: '60%',
// 			overflowWrap: 'break-word',
// 			display: 'inline-block',
// 			borderRadius: '15px',
// 			padding: '10px',
// 			marginRight: '10px',
// 			marginTop: '7px',
// 			marginBottom: '7px',
// 		}
// 		displayUsers.push(<div style={ styles } key={ this.state.users[i]._id }>{ this.state.users[i].name }</div>,<span>{ this.state.users[i].name }</span>,<br></br>);
// 	}
// }