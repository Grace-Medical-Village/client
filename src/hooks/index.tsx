import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

export { useStateWithStorage };
