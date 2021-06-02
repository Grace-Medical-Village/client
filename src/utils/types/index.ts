export enum ItemType {
  BACKGROUND = 'background',
  CONDITION = 'conditions',
  METRIC = 'metrics',
  MEDICATION = 'medications',
  NOTE = 'notes',
  PATIENT_SEARCH = 'patientSearch',
  UNKNOWN = '',
}

export type ResponseBody = string;
export interface Response {
  body: ResponseBody;
  error: string;
  statusCode: number;
}

/**
 * API
 */

// REQUEST
export type RequestSuccess = (n: number) => boolean;

// RESPONSE
export type ID = {
  id: number;
};

export type ResponseStatus = {
  status: number;
  statusText: string;
  id?: number;
  createdAt?: string;
  modifiedAt?: string;
};

// METHODS
export type DeleteMedication = (id: string | number) => Promise<ResponseStatus>;
export type DeletePatientCondition = (id: number) => Promise<ResponseStatus>;

export type GetConditions = () => Promise<Condition[]>;

export type GetMedications = () => Promise<Medication[]> | any; // todo

export type GetMetrics = () => Promise<Metric[]>;

export type GetMedicationCategories = () => Promise<MedicationCategory[]>;

export type GetPatient = (id: number) => Promise<PatientData>;

export type GetPatientsByBirthdate = (
  date: string
) => Promise<PatientSearchResult[]>;

export type GetPatientsByName = (
  name: string
) => Promise<PatientSearchResult[]>;

export type PostMedication = (
  name: string,
  strength: string,
  categoryId: string
) => Promise<ResponseStatus>;

export type PostPatient = (newPatient: NewPatient) => Promise<ResponseStatus>;

export type PostPatientCondition = (
  patientId: number,
  conditionId: number
) => Promise<ResponseStatus>;

export type PostPatientMedication = (
  patientId: number,
  medicationId: number
) => Promise<ResponseStatus>;

export type PostPatientMetric = (
  patientId: number,
  medicationId: number,
  value: number | string | boolean
) => Promise<ResponseStatus>;

export type PostPatientNote = (
  patientId: number,
  note: string
) => Promise<ResponseStatus>;

/**
 * STATE MANAGEMENT
 */
export type Condition = {
  id: number;
  conditionName: string;
};

export type MedicationCategory = {
  id: number;
  name: string;
  createdAt: string;
  modifiedAt: string;
};

export type Medication = {
  id: number;
  name: string;
  strength: string;
  categoryId: number;
  categoryName: string;
  createdAt: string;
  modifiedAt: string;
};

export type Metric = {
  id: number;
  metricName: string;
  unit_of_measure: string;
  uom: string;
  map: boolean;
  default_value?: number | string | boolean;
  min_value?: number | string;
  max_value?: number | string;
  createdAt: string;
  modifiedAt: string;
};

export type NewPatient = {
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: string;
  email?: string;
  height?: number;
  mobile?: string;
  country: string;
  nativeLanguage?: string;
  nativeLiteracy?: string;
  smoker: boolean;
};

export type PatientSearchResult = {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender?: string;
};

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  height?: string;
  mobile?: string;
  map: boolean;
  country?: string;
  nativeLanguage?: string;
  nativeLiteracy?: string;
  smoker: boolean;
};

export type PatientCondition = {
  id: number;
  conditionId: number;
  conditionName?: string;
  patientId: number;
  createdAt?: string;
  modifiedAt?: string;
};

export type PatientMedication = {
  id: number;
  medicationId: number;
  patientId: number;
  createdAt: string;
  modifiedAt: string;
};

export type PatientMetric = {
  id: number;
  metricId: number;
  patientId: number;
  value: string;
  createdAt: string;
  modifiedAt: string;
};

export type PatientNote = {
  id: number;
  note: string;
  patientId: number;
  createdAt: string;
  modifiedAt: string;
};

export type PatientData = {
  conditions?: PatientCondition[];
  medications?: PatientMedication[];
  metrics?: PatientMetric[];
  notes?: PatientNote[];
  patient?: Patient;
};

// CONTEXT
export type GetConditionsFromStorage = () => string[];
export interface MedicationState {
  categories: MedicationCategory[];
  medications: Medication[];
}

// LOCAL STORAGE
export enum Storage {
  CONDITIONS = 'conditions',
  METRICS = 'metrics',
}

/**
 * TABLES
 */
// MEDICATIONS
export type CategoryFilter = {
  text: string;
  value: string;
};

export type MedicationTableRecord = {
  key: number;
  id: number;
  name: string;
  strength: string | null;
  categoryName: string;
};

export type PatientMedicationTableRecord = {
  key: number;
  id: number;
  date: string;
  name: string;
  strength: string | null;
  category: string;
};

export type PatientMetricTableRecord = {
  key: number;
  id: number;
  date: string;
  metric: string;
  value: string | null;
};

export type PatientNoteTableRecord = {
  id: number;
  key: number;
  note: string;
  date: string;
};
