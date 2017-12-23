import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './chatRoom.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import axios from 'axios';
import UserOptions from './../userOptions/userOptions.jsx';
import UserDrawer from './../userOptions/userDrawer.jsx';

var charmander = new Audio('./dUOnnIrfzFKr.128.mp3');

class ChatRoom extends Component {
  constructor(props, context) {
	super(props, context);

    this.state = {
			messages: [],
			renderedMessageCount: 0,
			userOptionsToggleShow: {
				display: 'none'
			},
			//TEST
			rerouteToLogin: false
			//TEST
		}

		this.getMessages = this.getMessages.bind(this);		
		this.addMessage = this.addMessage.bind(this);
		this.checkForMessageUpdates = this.checkForMessageUpdates.bind(this);
		this.toggleUserOptions = this.toggleUserOptions.bind(this);
	}

	componentDidMount () {
		this.getMessages(this);		
		console.log('POKEMON', this.props.user.pokemon);		
		setInterval(this.checkForMessageUpdates, 100);	
	}

	componentDidUpdate () {
		console.log('chatRoom Updated');
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
				allMessages.push(response.data[i]);
			}
			that.setState({messages: allMessages});
			that.setState({renderedMessageCount: response.data.length});
			window.scrollTo(0, document.body.scrollHeight);
			charmander.play();
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

	render() {
		//TEST
		if(this.state.rerouteToLogin == true) return (<Redirect to='/'/>) 
		//TEST
	  else {
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
				displayMessages.push(<div style={ nameStyles }>{ this.state.messages[i].name }</div>,<div style={ styles } key={ this.state.messages[i]._id }>{ this.state.messages[i].message }</div>,<span></span>,<br></br>);
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
		
		let userPokemonButtonStyle = {
			// backgroundImage: 'url('')',
			backgroundImage: 'url(https://vignette.wikia.nocookie.net/pokemon/images/4/41/004Charmander_OS_anime_2.png/revision/latest?cb=20140603214909)',
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
				<header id='chatHeader' style={ headerStyle }>{ 'POKE CHAT' }
				{/* render userSettings component */}
					<button id='userOptionsButton' style={userPokemonButtonStyle} onClick={ () => { this.toggleUserOptions() }}></button>
					<div className='speech-bubble'>{'Good Evening, '}{this.props.user.name}{'!'}</div>
				<div id='userOptionsWrapper' style={this.state.userOptionsToggleShow}>
					{/* <UserOptions appContext={this.props.appContext} redirectToLogin={this.props.redirectToLogin} chatRoomContext={this}></UserOptions> */}
					<UserOptions appContext={this.props.appContext} redirectToLogin={this.props.redirectToLogin} user={this.props.user} chatRoomContext={this}></UserOptions>
				</div>
				<div id="userDrawerWrapper">
					<UserDrawer></UserDrawer>
				</div>
				</header>
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
}

export default ChatRoom;
