export interface Item {
  id: string;
  key: string;
}

export interface PatientItem extends Item {
  [k: string]: number | string | boolean;
}

export interface PatientId {
  id: string;
  key: string;
}

export interface PatientBackground {
  birthdate: string;
  country: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  key: string;
  nativeLanguage: string;
  literacy: string;
  lastName: string;
  zipCode5: string;
}
