import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import {
  BackgroundBuilder,
  PatientBackground,
  Storage,
} from '../../utils/types';

const LOCAL_STORAGE_KEY = Storage.BACKGROUND;

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useStateWithStorage(
      LOCAL_STORAGE_KEY,
      defaultValue
    );
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const backgroundBuilder: BackgroundBuilder = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);

  const defaultBackground: PatientBackground = {
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
  };

  if (localItem) {
    const parsedItem: PatientBackground = JSON.parse(localItem);
    return parsedItem;
  } else return defaultBackground;
};

const [ctx, BackgroundProvider] = createCtx(backgroundBuilder());
const BackgroundContext = ctx;

export { BackgroundProvider, BackgroundContext };
