import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/auth-context';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// TODO - Auth Provider
ReactDOM.render(
	// TODO - Strict Mode
	// TODO <React.StrictMode>
	<BrowserRouter>
		{/* <AuthProvider> */}
		<App />
		{/* </AuthProvider> */}
	</BrowserRouter>,
	// </React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
