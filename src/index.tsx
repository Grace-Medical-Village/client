import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './context/auth';
import { ConditionsProvider } from './context/conditions';
import { MetricsProvider } from './context/metrics';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { awsConfig } from './aws-config';
import './index.css';
import { MedicationsProvider } from './context/medications';
import { PatientProvider } from './context/patient';

Amplify.configure(awsConfig);

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <PatientProvider>
      <MedicationsProvider>
        <ConditionsProvider>
          <MetricsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MetricsProvider>
        </ConditionsProvider>
      </MedicationsProvider>
    </PatientProvider>
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
