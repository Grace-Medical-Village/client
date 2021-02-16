/**
 * DATABASE
 */
export interface Id {
  id: string;
}

export interface Item extends Id {
  key: string;
}

export interface Type {
  type: ItemType;
}
export interface ItemTimestamps {
  createdAt: number;
  modifiedAt: number;
}

export interface ItemWithType extends Item, Type {}

export interface DetailedItem extends ItemWithType, ItemTimestamps {}

export enum ItemType {
  BACKGROUND = 'background',
  CONDITION = 'conditions',
  METRIC = 'metric',
  MEDICATION = 'medication',
  NOTE = 'note',
  PATIENT_SEARCH = 'patientSearch',
}

// todo -> refactor this and backend to not use JSON.stringify
export type ResponseBody = string;
export interface Response {
  body: ResponseBody;
  error: string;
  statusCode: number;
}

export type PostData = NoteItem | MetricItem;
export type GetItem = (p: Item) => Promise<Partial<Response>>;
export type GetItems = (p: Id) => Promise<Partial<Response>>;
export type PostItem = (data: PostData) => Promise<boolean>;
export type PutItem = (
  id: string,
  key: string,
  data: unknown
) => Promise<boolean>;

// MEDICATION
export interface _Medication extends Item {
  medicationName: string;
  dosage: string | number;
  dosageType: string;
  active: boolean;
  datePrescribed: string;
}

// METRICS
// todo -> capitalization
export enum MetricId {
  bloodPressure = 'bloodPressure',
  cholesterolTotal = 'cholesterolTotal',
  heartRate = 'heartRate',
  hemoglobinA1c = 'hemoglobinA1c',
  weight = 'weight',
}

// todo -> capitalization
export enum MetricName {
  bloodPressure = 'Blood Pressure',
  cholesterolTotal = 'Cholesterol (Total)',
  heartRate = 'Heart Rate',
  hemoglobinA1c = 'Hemoglobin (A1c)',
  na = 'Not Available',
  weight = 'Weight',
}

export type MetricValue = boolean | number | string;

export type MetricRecord = {
  [key in MetricId]: MetricValue;
};

export interface MetricItem extends Item, ItemTimestamps, MetricRecord {
  type: ItemType.METRIC;
}

export type MetricState = {
  [key: string]: {
    [key in MetricId]?: MetricValue;
  };
};

export interface MetricOption {
  disabled: boolean;
  key: string;
  id: MetricId | null;
  name: string | MetricName;
  type?: string;
  max?: number;
  default?: number;
  min?: number;
  status?: string;
  step?: number;
  precision?: number;
}

export type MetricsBuilder = () => MetricState;

export type MetricEntry = [MetricName, MetricValue];

export type MetricsTableRecord = {
  key: string;
  date: string;
  metric: MetricName;
  value: MetricValue;
};

/**
 * NOTES
 */
export interface NoteItem extends Item, ItemTimestamps {
  staff: string;
  note: string;
  noteType: string; // todo
}

export type NoteBuilder = (note: string, noteType: string) => NoteItem;
export type NotesBuilder = () => NoteItem[];

export type NotesTableRecord = {
  key: string;
  date: string;
  note: string;
  noteType: any;
  staff: string;
};

// BACKGROUND
// background is used for saving static information about the patient
// it also contains some data that can be useful for fundraising
export interface PatientBackground extends ItemWithType, ItemTimestamps {
  birthdate: string;
  country: string;
  firstName: string;
  gender: string;
  nativeLiteracy: string;
  lastName: string;
  mobile?: string;
  nativeLanguage: string;
  zipCode5: string;
}

export type BackgroundBuilder = () => PatientBackground;
export type DashboardBackground = Partial<PatientBackground>;

export interface PatientStatistic {
  title: string;
  value: string | number;
}

// PATIENT SEARCH
// this is used for querying DynamoDB by birthdate to fetch all patients of a given birthdate
export interface PatientSearchItem extends ItemWithType, ItemTimestamps {
  birthdate: string;
  firstName: string;
  gender: string;
  lastName: string;
  mobile?: string;
  nativeLanguage: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * API
 */

// REQUEST

// RESPONSE
export type Medication = {
  id: number;
  name: string;
  strength: string;
  category_id: number;
  category_name: string;
  created_at: string;
  modified_at: string;
};

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
export type GetMedicationCategories = () => Promise<MedicationCategory[]>;
export type PostMedication = (
  name: string,
  strength: string,
  categoryId: string
) => Promise<ResponseStatus>;

/**
 * STATE MANAGEMENT
 */

// CONTEXT
export type GetConditionsFromStorage = () => string[];

export interface MedicationState {
  categories: MedicationCategory[];
  medications: Medication[];
}

// LOCAL STORAGE
export enum Storage {
  BACKGROUND = 'background', // todo rename to patient
  CONDITIONS = 'conditions',
  METRICS = 'metrics',
  NOTES = 'notes',
}

/**
 * TABLES
 */
// MEDICATIONS
export type CategoryFilter = {
  text: string;
  value: string;
};

export type MedicationTableData = {
  key: number;
  id: number;
  name: string;
  strength: string;
  category_name: string;
};
