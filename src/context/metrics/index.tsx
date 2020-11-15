import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import { MetricItem, MetricsBuilder, Storage } from '../../utils/types';

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

const metricsBuilder: MetricsBuilder = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);
  const defaultBackground: MetricItem[] = [];
  if (localItem) {
    const parsedItem: MetricItem[] = JSON.parse(localItem);
    return parsedItem;
  } else return defaultBackground;
};
const [ctx, MetricsProvider] = createCtx(metricsBuilder());
const MetricsContext = ctx;

export { MetricsProvider, MetricsContext };
