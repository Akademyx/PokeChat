import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App.jsx'


render((
	<BrowserRouter>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</BrowserRouter>
), document.getElementById('content'));