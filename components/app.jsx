import React, { Component } from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import Login from './landing/login.jsx';
import SignUp from './landing/signUp.jsx';
import ChatRoom from './chatRoom/chatRoom.jsx';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showLogin: 'block',
      showSignUp: 'none'
    };
    this.toggleLogin = this.toggleLogin.bind(this);    
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
  }

  toggleLogin () {
    if (this.state.showLogin === 'block') showLoginStatus = 'none';
    else showLoginStatus = 'block';
    this.setState({showLogin: showLoginStatus});
  }
  toggleSignUp () {
    if (this.state.showSignUp === 'block') showSignUpStatus = 'none';
    else showSignUpStatus = 'block';
    this.setState({showSignUp: showSignUpStatus});
  }		

  submitLoginCredentials (nameVal, passwordVal, that) {
    axios.post('/checkCredentials', {
      name: nameVal,
      password: passwordVal
    })
    .then(function (response) {
      console.log(response);
      document.getElementById("nameField").value = '', 
      document.getElementById("passwordField").value = ''
      // response data is an empty string this means the user isnt found in the database. 
      // alert the user of incorrect credentials
      if (response.data === '') alert ('incorrect password or username');
      // else that.setState({showLogin: 'none'});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <div id='loginWrapper' style={{display: this.state.showLogin}}>
          <MuiThemeProvider>
            <Login submitLoginCredentials = {this.submitLoginCredentials} parentContext = {this}/>
          </MuiThemeProvider>
        </div>
        <div id='signUpWrapper' style={{display: this.state.showSignUp}}>
          <SignUp/>
        </div>
      </div>
    )
    }
}

render(<App />, document.getElementById('content'));

