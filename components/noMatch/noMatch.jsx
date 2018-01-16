import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

// generate random 404 image
const noMatchImages = [{name: 'pikachuSad', url:'https://i.pinimg.com/originals/51/bf/59/51bf59f4089826658fdf1d50515af216.gif'}];

const noMatchImageContainerStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: 'url(' + noMatchImages[0].url +')'
}

class noMatch extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {

		};
  }
	
	render() {
		return (
      <div id='noMatchWrapper'>
        <div style={noMatchImageContainerStyle}></div>
        <h1>{'404 Not Found'}</h1>
      </div>
    )
  }
}

export default noMatch;


							