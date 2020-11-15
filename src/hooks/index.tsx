import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BackgroundContext } from '../context/background';

function useId(): string {
  const { state } = useContext(BackgroundContext);
  return state.id;
}

function useStateWithStorage<A>(
  name: string,
  val: A
): [A, Dispatch<SetStateAction<A>>] {
  const [state, update] = useState(val);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  }, [name, state]);

  return [state, update];
}

export { useId, useStateWithStorage };
