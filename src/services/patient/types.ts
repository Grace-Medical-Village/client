import { Item } from '../api/types';

export interface PatientNote extends Item {
  author: string;
  note: string;
}
export interface PatientGeneralDetails extends Item {
  birthdate: string;
  country: string;
  mobileNumber: string;
  firstName: string;
  gender: string;
  nativeLanguage: string;
  literacy: string;
  lastName: string;
  zipCode5: string;
}

export interface PatientStatistic {
  title: string;
  value: string | number;
}
