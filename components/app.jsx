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
      user: null,
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
        {/* <ChatRoom/> */}
        <Switch>
          {/* <Route exact path='/' component={Login}/> */}
          <Route exact path="/" render={props => <Login user={this.state.user} appContext={this} {...props} />} />
          <Route exact path="/signup" render={props => <SignUp user={this.state.user} appContext={this} {...props} />} />
          <Route exact path="/chatroom" render={props => <ChatRoom user={this.state.user} appContext={this} {...props} />} />
          {/* <Route path='/signup' component={SignUp}/> */}
          {/* <Route path='/chatroom' component={ChatRoom}/> */}
        </Switch>
      </div>
      )
    }
}

// render(<App />, document.getElementById('content'));
export default App;

