import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';

// generate random noMatch image
function generateRandomNoMatchImage() {
    return Math.floor(Math.random() * Math.floor(5));
}

// styles
const noMatchImages = [
  {name: 'pikachuSad', url:'https://i.pinimg.com/originals/51/bf/59/51bf59f4089826658fdf1d50515af216.gif'},
  {name: 'pikachuRain', url:'https://umad.com/img/2015/6/pikachu-gif-9389-9771-hd-wallpapers.jpg'},
  {name: 'pikachuCrying', url:'https://78.media.tumblr.com/833c255a2ef6927f86e2208b32949503/tumblr_mn4x4lPSIA1rxzbrao1_500.gif'},
  {name: 'meowthFloating', url:'https://78.media.tumblr.com/7a55fe8cb7439e4e723c30075b1cd5f4/tumblr_okggybqY2q1skvtnto3_540.gif'},
  {name: 'meowthLaughing', url:'https://78.media.tumblr.com/tumblr_m289upUIGo1rtv5wro1_500.gif'},
];
const noMatchImageContainerStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: 'url(' + noMatchImages[generateRandomNoMatchImage()].url + ')',
  backgroundSize: 'cover'
}
const noMatchHeaderStyle = {
  width: '300px',
  height: '100px',
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  margin: 'auto'
}
const linkToLandingStyle = {
  width: '300px',
  height: '100px',
  position: 'absolute',
  top: '200',
  bottom: '0',
  left: '190',
  right: '0',
  margin: 'auto',
  // fontFamily: 'Tahoma, Geneva',
  fontWeight: '900 !important',  
  textDecoration: 'none',
  color: 'white',
  letterSpacing: '1px',
}

class noMatch extends Component {
	constructor(props, context) {
    super(props, context);
    
  }
	
	render() {
		return (
      <div className='noMatchWrapper'>
        <div style={noMatchImageContainerStyle}></div>
        <h1 style={noMatchHeaderStyle}>{'Not Found'}</h1>
        <div>
					<Link to='/' style={linkToLandingStyle}>
  					<a id='redirectToLandingButton' type='button' linkButton={true}>Go to Pokechat</a>
					</Link>
 				</div>
      </div>
    )
  }
}

export default noMatch;


							