import { useContext } from 'react';
import { BackgroundContext } from '../context/background';

function useId(): string {
  const { state } = useContext(BackgroundContext);
  return state.id;
}

export { useId };
