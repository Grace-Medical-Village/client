import { Storage } from '../types';

export function clearStorage(): void {
  Object.values(Storage).forEach((o) => {
    localStorage.removeItem(o);
  });
}

export function stringArrayToNumberArray(a: string[]): number[] {
  const b: number[] = [];
  a.forEach((x) => {
    if (!isNaN(Number(x))) b.push(Number(x));
  });
  return b;
}
