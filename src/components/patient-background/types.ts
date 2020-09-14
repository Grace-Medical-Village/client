export interface PatientGeneralDetails {
  birthdate: string;
  country: string;
  firstName: string;
  gender: string;
  nativeLanguage: string;
  lastName: string;
}

export interface PatientStat {
  title: string;
  value: string | number;
}
