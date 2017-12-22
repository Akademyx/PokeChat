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
			messages: [],
			renderedMessageCount: 0
		}
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
			console.log(response);
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
			that.setState({renderedMessageCount: response.data.length});
			window.scrollTo(0, document.body.scrollHeight);
		})
		.catch(function (error) {
			console.log(error);
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
		let that = this;
		axios.get('/checkForUpdates', {
		})
		.then(function (response) {
			console.log(response.data);
			if(response.data.length > that.state.renderedMessageCount) that.getMessages(that);
		})
		.catch(function (error) {
			console.log(error);
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
					// float: 'right'
				}
				let spanStyle = {
					// float: 'right',
					// padding: '17px'
				}
				displayMessages.push(<div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span style={ spanStyle }>{ this.state.messages[i].name }</span>,<br></br>);				
			}
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
			lineHeight: '60px', // centers text vertically
			textAlign: 'center',
			border: '1px',
			backgroundColor: this.props.user.themeColor,
			opacity: '0.9'
		}

  	return (
			<div>
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
