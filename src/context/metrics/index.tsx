import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import { MetricsBuilder, MetricState, Storage } from '../../utils/types';

const LOCAL_STORAGE_KEY = Storage.METRICS;
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

const defaultMetricState: MetricState = {};
const metricsBuilder: MetricsBuilder = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localItem) {
    const parsedItem: MetricState = JSON.parse(localItem);
    return parsedItem;
  } else return defaultMetricState;
};
const [ctx, MetricsProvider] = createCtx(metricsBuilder());
const MetricsContext = ctx;

export { MetricsProvider, MetricsContext, defaultMetricState };
