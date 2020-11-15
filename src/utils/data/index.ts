import { Storage } from '../types';

export function clearStorage(): void {
  Object.values(Storage).forEach((o) => {
    localStorage.removeItem(o);
  });
}
