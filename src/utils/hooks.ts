import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../context/auth-context';

const authCtx = useContext(AuthContext);
let history = useHistory();

export function useSignIn(username: string, password: string) {
  useEffect(() => {
    async function signIn() {
      try {
        const user = await Auth.signIn(username, password);
        if (user) {
          authCtx.update({ authenticated: true, username });
          history.push('/dashboard');
        }
      } catch (error) {
        console.log('error signing in', error);
      }
    }
    if (username.length > 0 && password.length > 0) {
      signIn();
    }
  }, [username, password]);
}
