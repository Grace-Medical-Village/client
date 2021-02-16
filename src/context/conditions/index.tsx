import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import { GetConditionsFromStorage, Storage } from '../../utils/types';

const LOCAL_STORAGE_KEY = Storage.CONDITIONS;
function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const ConditionsContext = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useStateWithStorage(
      LOCAL_STORAGE_KEY,
      defaultValue
    );
    return <ConditionsContext.Provider value={{ state, update }} {...props} />;
  }
  return [ConditionsContext, Provider] as const;
}

const defaultConditionsState: string[] = [];

const getConditionsFromStorage: GetConditionsFromStorage = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localItem) {
    const parsedItem: string[] = JSON.parse(localItem);
    return parsedItem;
  } else return defaultConditionsState;
};

const [ConditionsContext, ConditionsProvider] = createCtx(
  getConditionsFromStorage()
);

export { ConditionsProvider, ConditionsContext, defaultConditionsState };
