import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './context/auth';
import { MetricsProvider } from './context/metrics';
import { PatientProvider } from './context/patient';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { config } from './config';
import './index.css';

Amplify.configure(config);

ReactDOM.render(
  // TODO <React.StrictMode>
  <AuthProvider>
    <PatientProvider>
      <MetricsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MetricsProvider>
    </PatientProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
