import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import { Conditions, ConditionsBuilder, Storage } from '../../utils/types';

const LOCAL_STORAGE_KEY = Storage.CONDITIONS;
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

const conditionsBuilder: ConditionsBuilder = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  const defaultBackground: Conditions = [];
  if (localItem) {
    const parsedItem: Conditions = JSON.parse(localItem);
    return parsedItem;
  } else return defaultBackground;
};
const [ctx, ConditionsProvider] = createCtx(conditionsBuilder());
const ConditionsContext = ctx;

export { ConditionsProvider, ConditionsContext };
