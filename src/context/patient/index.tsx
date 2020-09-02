import React from 'react';

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, PatientProvider] = createCtx({
  birthdate: '',
  country: '',
  firstName: '',
  gender: '',
  id: '',
  key: '',
  language: '',
  lastName: '',
  zipCode5: '',
});
const PatientContext = ctx;

export { PatientProvider, PatientContext };
