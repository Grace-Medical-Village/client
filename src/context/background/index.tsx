import React, {
  createContext,
  // useState,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useStateWithStorage('background', defaultValue);
    // const [state, update] = useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, BackgroundProvider] = createCtx({
  id: '',
  key: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  country: '',
  gender: '',
  literacy: '',
  mobileNumber: '',
  nativeLanguage: '',
  zipCode5: '',
});
const BackgroundContext = ctx;

export { BackgroundProvider, BackgroundContext };
