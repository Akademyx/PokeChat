import React from 'react'
import { render } from 'react-dom'
// import { BrowserRouter, browserHistory } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
// import { Router, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App.jsx'
// import createBrowserHistory from 'history/createBrowserHistory'

// const newHistory = createBrowserHistory();
// var browserHistory = browserHistory;


render((
	// <BrowserRouter history={browserHistory}>
	<BrowserRouter>	
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</BrowserRouter>
), document.getElementById('content'));