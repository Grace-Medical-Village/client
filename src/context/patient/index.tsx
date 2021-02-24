import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { PatientData } from '../../utils/types';

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;
  const PatientContext = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useState(defaultValue);
    return <PatientContext.Provider value={{ state, update }} {...props} />;
  }
  return [PatientContext, Provider] as const;
}

const defaultState: PatientData = {};

const [PatientContext, PatientProvider] = createCtx(defaultState);

export { PatientProvider, PatientContext };
