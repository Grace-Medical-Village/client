import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { MedicationState } from '../../utils/types';

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const MedicationsContext = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useState(defaultValue);
    return <MedicationsContext.Provider value={{ state, update }} {...props} />;
  }

  return [MedicationsContext, Provider] as const;
}

const defaultMedicationsState: MedicationState = {
  categories: [],
  medications: [],
};

const [MedicationsContext, MedicationsProvider] = createCtx(
  defaultMedicationsState
);
export { MedicationsProvider, MedicationsContext };
