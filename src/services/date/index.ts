export const yearMonthDay = 'YYYY-MM-DD';
export const monthDayYear = 'M-D-YYYY';

export const todayAsYearMonthDay = (date: Date) =>
  date.toISOString().split('T')[0];

export const getAge = (birthdate: string): number => {
  const now = new Date();
  const past = new Date(birthdate);
  const nowYear = now.getFullYear();
  const pastYear = past.getFullYear();
  const age = nowYear - pastYear;

  return age;
};
