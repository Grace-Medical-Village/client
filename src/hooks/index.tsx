import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../context/background';

function useId(): string {
  const { state } = useContext(BackgroundContext);
  return state.id;
}

function useStateWithStorage(name: any, val: any): any {
  const [state, update] = useState(val);

  useEffect(() => {
    localStorage.setItem('', JSON.stringify(state));
  }, [state]);

  return [state, update];
}

export { useId, useStateWithStorage };
