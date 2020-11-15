import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
} from 'react';
import { useStateWithStorage } from '../../hooks';
import { Note, NotesBuilder, Storage } from '../../utils/types';

const LOCAL_STORAGE_KEY = Storage.NOTES;

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

const notesBuilder: NotesBuilder = () => {
  const localItem = localStorage.getItem(LOCAL_STORAGE_KEY);

  const defaultBackground: Note[] = [];

  if (localItem) {
    const parsedItem: Note[] = JSON.parse(localItem);
    return parsedItem;
  } else return defaultBackground;
};

const [ctx, NotesProvider] = createCtx(notesBuilder());
const NotesContext = ctx;

export { NotesProvider, NotesContext };
