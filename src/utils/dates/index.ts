import dayjs from 'dayjs';

const longDate = 'MMMM D, YYYY';
const monthDayYear = 'MM/DD/YYYY';
const monthAndYear = 'MMMM YYYY';
const yearMonthDay = 'YYYY-MM-DD';

const todayAsYearMonthDay = (): string =>
  new Date().toISOString().split('T')[0];

const toIso8601DateFromDate = (date: Date): string =>
  date.toISOString().split('T')[0];

const getAge = (birthdate: string): number => {
  const today = dayjs(todayAsYearMonthDay());
  return today.diff(birthdate, 'year');
};

const monthDayYearFullDate = (date: string): string => {
  return dayjs(date).format(longDate);
};

const dateToMonthAndYear = (date: string): string => {
  return dayjs(date).format(monthAndYear);
};

const timestampFromDateString = (date: string): number => {
  return new Date(date).getTime();
};

const addDay = (originalDate: string, daysToAdd: number): string => {
  const date = new Date(originalDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
};

export {
  longDate,
  monthAndYear,
  monthDayYear,
  yearMonthDay,
  addDay,
  dateToMonthAndYear,
  getAge,
  monthDayYearFullDate,
  timestampFromDateString,
  todayAsYearMonthDay,
  toIso8601DateFromDate,
};
