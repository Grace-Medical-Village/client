import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { Condition } from '../../utils/types';

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const ConditionsContext = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useState(defaultValue);
    return <ConditionsContext.Provider value={{ state, update }} {...props} />;
  }
  return [ConditionsContext, Provider] as const;
}

const defaultConditionsState: Condition[] = [];

const [ConditionsContext, ConditionsProvider] = createCtx(
  defaultConditionsState
);

export { ConditionsProvider, ConditionsContext };
