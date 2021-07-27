export enum ItemType {
  METRIC = 'metrics',
  MEDICATION = 'medications',
  NOTE = 'notes',
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
  error?: string;
  createdAt?: string;
  modifiedAt?: string;
};

// METHODS
export type DeleteMedication = (id: number) => Promise<ResponseStatus>;
export type DeletePatientCondition = (id: number) => Promise<ResponseStatus>;
export type DeletePatientMedication = (id: number) => Promise<ResponseStatus>;
export type DeletePatientMetric = (id: number) => Promise<ResponseStatus>;
export type DeletePatientNote = (id: number) => Promise<ResponseStatus>;
export type GetConditions = () => Promise<Condition[]>;
export type GetMapPatients = () => Promise<MapPatient[]>;
export type GetMedications = () => Promise<Medication[]>;
export type GetMetrics = () => Promise<Metric[]>;
export type GetMedicationCategories = () => Promise<MedicationCategory[]>;
export type GetPatient = (id: number) => Promise<PatientData>;
export type GetPatientCount = () => Promise<number>;
export type GetPatientCountByDate = (
  startDate: string,
  endDate: string
) => Promise<number>;
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
export type PostPatient = (
  newPatient: PatientBackground
) => Promise<ResponseStatus>;
export type PostPatientAllergy = (
  patientId: number,
  allergies: string
) => Promise<ResponseStatus>;
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
  value: number | string | boolean,
  comment: string | null
) => Promise<ResponseStatus>;
export type PostPatientNote = (
  patientId: number,
  note: string
) => Promise<ResponseStatus>;
export type PutMedication = (med: Medication) => Promise<ResponseStatus>;
export type PutPatient = (
  id: number,
  patient: PatientBackground
) => Promise<ResponseStatus>;
export type PutPatientAllergy = (
  patientId: number,
  allergy: string
) => Promise<ResponseStatus>;

export type PutPatientNote = (
  id: number,
  note: Note
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
  archived: boolean | string;
  createdAt: string;
  modifiedAt: string;
};

type Key = {
  key: number;
};

type Note = {
  note: string;
};

export type MapPatient = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  birthdate?: string;
  createdAt: string;
};
export type MapPatientTableRecord = MapPatient & Key;

export type MedicationTableRecord = Medication & Key;

export type Metric = {
  id: number;
  metricName: string;
  unit_of_measure: string;
  uom: string;
  map: boolean;
  format: string;
  pattern: string;
  minValue: number;
  maxValue: number;
  createdAt: string;
  modifiedAt: string;
};

export type Patient = ID & PatientBackground;

export type PatientBackground = {
  firstName: string;
  lastName: string;
  fullName?: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  mobile?: string;
  map: boolean;
  country?: string;
  nativeLanguage?: string;
  nativeLiteracy?: number;
  smoker: boolean;
  zipCode5?: string;
};

export type PatientSearchResult = {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender?: string;
};

export type PatientAllergy = {
  id: number;
  allergies: string;
  patientId: number;
  createdAt?: string;
  modifiedAt?: string;
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
  comment: string | null;
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
  allergies?: PatientAllergy;
  conditions?: PatientCondition[];
  medications?: PatientMedication[];
  metrics?: PatientMetric[];
  notes?: PatientNote[];
  patient?: Patient;
};

// CONTEXT
export interface MedicationState {
  categories: MedicationCategory[];
  medications: Medication[];
}

// LOCAL STORAGE
export enum Storage {
  CONDITIONS = 'conditions',
}

/**
 * TABLES
 */
// MEDICATIONS
export type PatientMedicationTableRecord = {
  key: number;
  id: number;
  date: string;
  name: string;
  strength: string | null;
  category: string;
  timestamp: number;
};

export type PatientMetricTableRecord = {
  key: number;
  id: number;
  date: string;
  metric: string;
  value: string | null;
  comment: string;
  timestamp: number;
};

export type PatientNoteTableRecord = {
  id: number;
  key: number;
  note: string;
  date: string;
  timestamp: number;
};
