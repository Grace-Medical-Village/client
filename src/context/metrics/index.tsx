import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { Metric } from '../../utils/types';

function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const MetricsContext = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<unknown>) {
    const [state, update] = useState(defaultValue);
    return <MetricsContext.Provider value={{ state, update }} {...props} />;
  }

  return [MetricsContext, Provider] as const;
}

const defaultState: Metric[] = [];

const [MetricsContext, MetricsProvider] = createCtx(defaultState);
export { MetricsProvider, MetricsContext };
