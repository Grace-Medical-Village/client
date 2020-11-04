import React from 'react';

function createCtx<A>(defaultValue: A) {
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

const [ctx, BackgroundProvider] = createCtx({
  birthdate: '',
  country: '',
  mobileNumber: '',
  firstName: '',
  gender: '',
  id: '',
  key: '',
  nativeLanguage: '',
  lastName: '',
  literacy: '',
  zipCode5: '',
});
const BackgroundContext = ctx;

export { BackgroundProvider, BackgroundContext };
