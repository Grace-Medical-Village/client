export const yearMonthDay = 'YYYY-MM-DD';
export const monthDayYear = 'MM/DD/YYYY';

export const todayAsYearMonthDay = (): string =>
  new Date().toISOString().split('T')[0];

export const toIso8601DateFromDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const toIso8601DateFromTimestamp = (date: number): string =>
  new Date(date).toISOString().split('T')[0];

export const getAge = (birthdate: string): number => {
  const now = new Date();
  const past = new Date(birthdate);
  const nowYear = now.getFullYear();
  const pastYear = past.getFullYear();
  const age = nowYear - pastYear;

  return age;
};

export const monthDayYearFullDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
