import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import styles from './userOptions.css';

class userOptions extends Component {
	constructor(props, context) {
    super(props, context);
    // this.state = {
    //   redirectToLogin: false
    // }
    this.logOut = this.logOut.bind(this);
  }

  logOut () {
    let appState = this.props.appContext;
    appState.setState({user: {id: null, name: null, password: null, pokemon: null, themeColor: null, _v: 0, id: null}});
    // appState.setState({redirectToLogin: true});
    // this.setState({redirectToLogin: true});
    this.props.chatRoomContext.setState({rerouteToLogin: true});
    appState.setState(appState.state);
  }

  render () {
  // if (this.props.redirectToLogin === true) return (<Redirect to='/'/>);
  // if (this.state.redirectToLogin === true) return (<Redirect to='/'/>);  
    return (
      <div id='userOptionsWrapper'>
        <button onClick={ () => { this.logOut() }}></button>
      </div>
      )
    }
}

export default userOptions 