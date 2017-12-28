import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './chatRoom.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import {orange500, deepOrange500, red300, red400, red800 } from 'material-ui/styles/colors';
import axios from 'axios';
import UserOptions from './../userOptions/userOptions.jsx';
import UserDrawer from './../userOptions/userDrawer.jsx';

// material-ui styles
const fieldStyles = {
	colorOrange: {
		color: orange500,
	},
	colorDeepOrange: {
		color: deepOrange500,
	},
	colorRed: {
		color: red400
	},
	colorLightRed: {
		color: red300
	},
	colorDeepRed: {
		color: red800
	},
	underlineStyle: {
    borderColor: red300,
  },
}

class ChatRoom extends Component {
  constructor(props, context) {
	super(props, context);
	
    this.state = {
			messages: [],
			renderedMessageCount: 0,
			userOptionsToggleShow: {
				display: 'none'
			},
			showSpeechBubble: 'show',
			greeting: null,
			greetingPunctuation: '!',
			// rerouteToLogin: false
		}
		this.getMessages = this.getMessages.bind(this);		
		this.addMessage = this.addMessage.bind(this);
		this.checkForMessageUpdates = this.checkForMessageUpdates.bind(this);
		this.toggleUserOptions = this.toggleUserOptions.bind(this);
		this.toggleSpeechBubble = this.toggleSpeechBubble.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		// this.checkInterval = this.checkInterval.bind(this);
	}

	componentDidMount () {
		this.getMessages(this);
		setTimeout(this.toggleSpeechBubble, 13000);	
		let current_hour = new Date().getHours();
		if (current_hour >= 5 && current_hour < 12) this.setState({greeting: 'Good morning, ', greetingPunctuation: '!'});
		else if (current_hour >= 12 && current_hour < 18) this.setState({greeting: 'Good afternoon, ', greetingPunctuation: '!'});
		else if (current_hour >= 18 && current_hour <= 22) this.setState({greeting: 'Good evening, ', greetingPunctuation: '!'});
		else this.setState({greeting: 'Up late, ', greetingPunctuation: '?'});
		this.checkInterval = setInterval(
      () => this.checkForMessageUpdates(),
      100
		);
		// window.scrollTo(0, document.body.scrollHeight);	
	}

	componentWillUnmount () {
		// clear setInterval for checkForMessageUpdates
		clearInterval(this.checkInterval);
	}

	addMessage (message, that) {
		if (message === '') {
			this.setState({greeting: 'Hey! Make sure you enter something, '});
			this.setState({showSpeechBubble: 'block', greetingPunctuation: '.'});
			setTimeout(this.toggleSpeechBubble, 13000);
		}
		else {
			axios.post('/addMessage', {
				message: message,
				name: that.props.user.name,
				password: that.props.user.password,
				pokemon: that.props.user.pokemon,
				themeColor: that.props.user.themeColor,
			})
			.then(function (response) {
				console.log(response);
				document.getElementById('messageField').value = '';				
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	handleKeyPress (event, message) {
		if(event.key == 'Enter'){
			addMessage('hello', this)
		}
	}

	getMessages (that) {
		axios.get('/getMessages', {
		})
		.then(function (response) {
			console.log(response.data);
			let allMessages = [];
			for ( let i = 0; i < response.data.length; i++ ) {
				allMessages.push(response.data[i]);
			}
			that.setState({messages: allMessages});
			that.setState({renderedMessageCount: response.data.length});
			// may fire before setState has completed 
			window.scrollTo(0, document.body.scrollHeight);
		})
		.catch(function (error) {
			console.log(error);
		});
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

	toggleUserOptions () {
		if (this.state.userOptionsToggleShow.display === 'none') this.setState({userOptionsToggleShow: {display: 'block'}});
		else this.setState({userOptionsToggleShow: {display: 'none'}}); 
	}

	toggleSpeechBubble () {
		this.setState({showSpeechBubble: 'none'});
	}

	scrollToBottom () {
		this.el.scrollIntoView({ behaviour: 'smooth' });			
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
				let nameStyles = {
					minWidth: '80px',
					// maxWidth: '60px',
					display: 'inline-block',
					borderRadius: '15px',
					padding: '10px',
					marginRight: '10px',
					marginTop: '7px',
					marginBottom: '7px',
					textAlign: 'center'
				}
				displayMessages.push(<div style={ nameStyles }>{ 'me' }</div>,<div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span style={ spanStyle }></span>,<br></br>);				
			}
			else {
				let messageStyles = {
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

				let nameStyles = {
					minWidth: '80px',
					// maxWidth: '60px',
					display: 'inline-block',
					borderRadius: '15px',
					padding: '10px',
					marginRight: '10px',
					marginTop: '7px',
					marginBottom: '7px',
					textAlign: 'center'
				}
				displayMessages.push(<div style={ nameStyles }>{ this.state.messages[i].name }</div>,<div className='message' style={ messageStyles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span></span>,<br></br>);
			}
		}

		let headerStyle = {
			position: 'fixed',
			zIndex: '1',
			width: '100%',
			height: '60px',
			lineHeight: '60px', // centers text vertically
			textAlign: 'center',
			borderBottom: '1px solid white',
			backgroundColor: this.props.user.themeColor,
			opacity: '0.99',
		}
		
		let userPokemonButtonStyle = {
			backgroundImage: 'url(' + this.props.user.pokemon + ')',
			backgroundSize: '100px 100px',
			position: 'absolute',
			top: '80px',
			right: '20px',
			height: '100px',
			width: '100px',
			borderRadius: '50%'
		}

  	return (
			<div>
				<header id='chatHeader' style={ headerStyle }>
					<h5>{ 'POKE CHAT' }</h5>
					<button id='userOptionsButton' style={userPokemonButtonStyle} onClick={ () => { this.toggleUserOptions() }}></button>
					<div className='speech-bubble fadeOut' style={{display: this.state.showSpeechBubble}} onClick={ () => { this.toggleSpeechBubble() }}>{this.state.greeting}{this.props.user.name}{this.state.greetingPunctuation}</div>
				<div id='userOptionsWrapper' style={this.state.userOptionsToggleShow}>
					<UserOptions appContext={this.props.appContext} chatRoomContext={this} redirectToLogin={this.props.redirectToLogin} user={this.props.user}></UserOptions>
				</div>
				<div id="userDrawerWrapper">
					<UserDrawer appContext={this.props.appContext}user={this.props.user}></UserDrawer>
				</div>
				</header>
				<div id='messagesContainer'>{ displayMessages }</div>
				<div id='chatFooter'>
					<TextField
						id="messageField"
						hintText="message"
						type="text"
						hintStyle={fieldStyles.colorLightRed}
						underlineStyle={fieldStyles.underlineStyle}
						onKeyDown={ () => {this.handleKeyPress()}}
					/>
					<div className="btn-wrap-send">
							<a className='landingButtonsChatRoom' onClick={ () => {
							this.addMessage(
								document.getElementById("messageField").value, 
								this
							)
							}}>Send</a>
						</div>
					{/* <FlatButton 
						label="Add Message" 
						fullWidth={true} 
						onClick={ () => {
							this.addMessage(
								document.getElementById("messageField").value, 
								this
							)
					}}/> */}
				</div>
				{/* <div ref={el => { this.el = el; }}></div> */}
			</div>
    	)
	}
}

export default ChatRoom;
