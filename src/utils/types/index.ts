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
export type ResponseStatus = {
  status: number;
  statusText: string;
};

export type MedicationCategory = {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
};

// METHODS
export type DeleteMedication = (id: string | number) => Promise<ResponseStatus>;

export type GetConditions = () => Promise<string[]>;

export type GetMedications = () => Promise<Medication[]> | any; // todo

export type GetMetrics = () => Promise<Metric[]>;

export type GetMedicationCategories = () => Promise<MedicationCategory[]>;

export type GetPatient = (
  id: number,
  patient: boolean,
  conditions: boolean,
  medications: boolean,
  metrics: boolean,
  notes: boolean
) => Promise<PatientData>;

export type GetPatientMedications = (
  id: number
) => Promise<PatientMedication[]>;

export type GetPatientMetrics = (id: number) => Promise<PatientMetric[]>;

export type GetPatientNotes = (id: number) => Promise<PatientNote[]>;

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
export type Medication = {
  id: number;
  name: string;
  strength: string;
  category_id: number;
  category_name: string;
  created_at: string;
  modified_at: string;
};

export type Metric = {
  id: number;
  metric_name: string;
  unit_of_measure: string;
  uom: string;
  map: boolean;
  default_value?: number | string | boolean;
  min_value?: number | string;
  max_value?: number | string;
  created_at: string;
  modified_at: string;
};

export type PatientSearchResult = {
  id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  gender?: string;
  mobile?: string;
};
export type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  birthdate?: string;
  gender?: string;
  email?: string;
  height?: string;
  mobile?: string;
  map: boolean;
  country?: string;
  native_language?: string;
  native_literacy?: string;
  smoker: boolean;
};

export type PatientCondition = {
  id: number;
  condition_id: number;
  patient_id: number;
  created_at: string;
  modified_at: string;
};

export type PatientMedication = {
  id: number;
  medication_id: number;
  patient_id: number;
  created_at: string;
  modified_at: string;
};

export type PatientMetric = {
  id: number;
  metric_id: number;
  patient_id: number;
  value: string;
  created_at: string;
  modified_at: string;
};

export type PatientNote = {
  id: number;
  note: string;
  patient_id: number;
  created_at: string;
  modified_at: string;
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
  category_name: string;
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
