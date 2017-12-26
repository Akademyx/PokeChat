import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router-dom';
// import { browserHistory, Router, IndexRoute } from 'react-router';
import Login from './landing/login.jsx';
import SignUp from './landing/signUp.jsx';
import ChatRoom from './chatRoom/chatRoom.jsx';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: null
      // redirectToLogin: false
    };
  }

  // child components of these below inherit routing abilities
  render() {
    return (
      <div>
      {/* <Router history={browserHistory}> */}
        <Switch>
          <Route exact path="/" render={props => <Login user={this.state.user} appContext={this} {...props} />} />
          <Route path="/signup" render={props => <SignUp user={this.state.user} appContext={this} {...props} />} />
          <Route path="/chatroom" render={props => <ChatRoom user={this.state.user} appContext={this} {...props} />} />
          {/* <Route exact path="/chatroom" render={props => <ChatRoom user={this.state.user} appContext={this} redirectToLogin={this.state.redirectToLogin} {...props} />} /> */}
        </Switch>
      {/* </Router> */}
      </div>
      )
    }
}

export default App;

