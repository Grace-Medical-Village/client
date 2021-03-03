export const yearMonthDay = 'YYYY-MM-DD';
export const monthDayYear = 'MM/DD/YYYY';

export const todayAsYearMonthDay = (): string =>
  new Date().toISOString().split('T')[0];

export const toIso8601DateFromDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const toIso8601DateFromTimestamp = (date: number): string =>
  new Date(date).toISOString().split('T')[0];

export const getAge = (birthdate: string): number => {
  const diffMs = Date.now() - new Date(birthdate).getTime();
  const ageDate = new Date(diffMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const monthDayYearFullDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
