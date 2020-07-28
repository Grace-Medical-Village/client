import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../context/auth-context';

export async function useSignIn(username: string, password: string) {
  const authCtx = useContext(AuthContext);
  let history = useHistory();
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
