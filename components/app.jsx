import React, { Component } from 'react';
import { render } from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route } from 'react-router-dom';
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
  }

  render() {
    return (
      <div>
        {/* <div id='loginWrapper' style={{display: this.state.showLogin}}>
          <MuiThemeProvider>
            <Login submitLoginCredentials = {this.submitLoginCredentials} parentContext = {this}/>
            <SignUp/>
            <ChatRoom/>
          </MuiThemeProvider>
        </div> */}
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/chatroom' component={ChatRoom}/>
        </Switch>
      </div>
      )
    }
}

// render(<App />, document.getElementById('content'));
export default App;

