import React from 'react';
import { MetricObject } from '../../services/metrics/types';

function createCtx<A>(defaultValue: MetricObject) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<unknown>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, MetricsProvider] = createCtx({});
const MetricsContext = ctx;

export { MetricsProvider, MetricsContext };
