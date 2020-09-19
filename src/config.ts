const {
  REACT_APP_COGNITO_APP_CLIENT_ID,
  REACT_APP_COGNITO_DOMAIN,
  REACT_APP_COGNITO_REGION,
  REACT_APP_COGNITO_USER_POOL_ID,
} = process.env;

const local = {
  Auth: {
    region: REACT_APP_COGNITO_REGION,
    userPoolId: REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_COGNITO_APP_CLIENT_ID,
    domain: REACT_APP_COGNITO_DOMAIN,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

const development = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_Pku3BZzNi',
    userPoolWebClientId: '35o3hsapruk3c6r7iqsuhk9n1j',
    domain: 'ttps://gmv-auth-dev.auth.us-east-1.amazoncognito.com',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};

export const config =
  process.env.REACT_APP_STAGE === 'development' ? development : local;
