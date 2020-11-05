const {
  REACT_APP_COGNITO_APP_CLIENT_ID,
  REACT_APP_COGNITO_DOMAIN,
  REACT_APP_COGNITO_REGION,
  REACT_APP_COGNITO_USER_POOL_ID,
} = process.env;

export const config = {
  Auth: {
    region: REACT_APP_COGNITO_REGION,
    userPoolId: REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_COGNITO_APP_CLIENT_ID,
    domain: REACT_APP_COGNITO_DOMAIN,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
};
