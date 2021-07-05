import dayjs from 'dayjs';

export const yearMonthDay = 'YYYY-MM-DD';
export const monthDayYear = 'MM/DD/YYYY';

export const todayAsYearMonthDay = (): string =>
  new Date().toISOString().split('T')[0];

export const toIso8601DateFromDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const getAge = (birthdate: string): number => {
  const today = dayjs(todayAsYearMonthDay());
  return today.diff(birthdate, 'year');
};

export const monthDayYearFullDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export const timestampFromDateString = (date: string): number => {
  return new Date(date).getTime();
};
