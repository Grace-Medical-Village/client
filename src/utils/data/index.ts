import { Storage } from '../types';

function clearStorage(): void {
  Object.values(Storage).forEach((o) => {
    localStorage.removeItem(o);
  });
}

function stringArrayToNumberArray(a: string[]): number[] {
  const b: number[] = [];
  a.forEach((x) => {
    if (!isNaN(Number(x))) b.push(Number(x));
  });
  return b;
}

const mobileCleaner = new RegExp(/[\D]/, 'gi');

export { clearStorage, mobileCleaner, stringArrayToNumberArray };
