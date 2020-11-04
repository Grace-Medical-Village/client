import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from './context/auth';
import { BackgroundProvider } from './context/background';
import { ConditionsProvider } from './context/conditions';
import { MetricsProvider } from './context/metrics';
import { NotesProvider } from './context/notes';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { config } from './config';
import './index.css';

Amplify.configure(config);

ReactDOM.render(
  // TODO <React.StrictMode>
  <AuthProvider>
    <BackgroundProvider>
      <ConditionsProvider>
        <NotesProvider>
          <MetricsProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MetricsProvider>
        </NotesProvider>
      </ConditionsProvider>
    </BackgroundProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
