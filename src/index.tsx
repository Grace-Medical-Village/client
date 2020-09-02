import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { PatientProvider } from './context/patient';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  // TODO <React.StrictMode>
  <AuthProvider>
    <PatientProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PatientProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
