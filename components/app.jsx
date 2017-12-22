import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" render={props => <Login user={this.state.user} appContext={this} {...props} />} />
          <Route exact path="/signup" render={props => <SignUp user={this.state.user} appContext={this} {...props} />} />
          <Route exact path="/chatroom" render={props => <ChatRoom user={this.state.user} appContext={this} {...props} />} />
        </Switch>
      </div>
      )
    }
}

export default App;

