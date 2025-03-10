import { Storage } from '../types';

function clearStorage(): void {
  Object.values(Storage).forEach((o) => {
    localStorage.removeItem(o);
  });
}

const mobileCleaner = new RegExp(/[\D]/, 'gi');

function stringArrayToNumberArray(a: string[]): number[] {
  const b: number[] = [];
  a.forEach((x) => {
    if (!isNaN(Number(x))) b.push(Number(x));
  });
  return b;
}

export { clearStorage, mobileCleaner, stringArrayToNumberArray };
