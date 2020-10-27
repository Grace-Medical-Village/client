export const yearMonthDay = 'YYYY-MM-DD';
export const monthDayYear = 'MM/DD/YYYY';

export const todayAsYearMonthDay = (date: Date): string =>
  date.toISOString().split('T')[0];

export const getAge = (birthdate: string): number => {
  const now = new Date();
  const past = new Date(birthdate);
  const nowYear = now.getFullYear();
  const pastYear = past.getFullYear();
  const age = nowYear - pastYear;

  return age;
};
