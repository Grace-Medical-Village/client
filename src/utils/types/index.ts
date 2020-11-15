/**
 * DATABASE
 */
export interface Id {
  id: string;
}

export interface Item extends Id {
  key: string;
  type?: ItemType;
  createdAt?: number;
  modifiedAt?: number;
}

export enum ItemType {
  BACKGROUND = 'background',
  CONDITION = 'conditions',
  METRIC = 'metric',
  MEDICATION = 'medication',
  NOTE = 'note',
}

// todo -> refactor this and backend to not use JSON.stringify
export type ResponseBody = string;
export interface Response {
  body: ResponseBody;
  error: string;
  statusCode: number;
}

export type PostData = Note | ConditionItem | MetricItem;
export type GetItem = (p: Item) => Promise<Partial<Response>>;
export type GetItems = (p: Id) => Promise<Partial<Response>>;
export type PostItem = (data: PostData) => Promise<boolean>;
export type PutItem = (data: unknown) => Promise<boolean>;

/**
 * LOCAL STATE
 */
export enum Storage {
  BACKGROUND = 'background',
  CONDITIONS = 'conditions',
  MEDICATIONS = 'medications',
  METRICS = 'metrics',
  NOTES = 'notes',
}

/**
 *  MEDICATION
 **/
export interface Medication extends Item {
  medicationName: string;
  dosage: string | number;
  dosageType: string;
  active: boolean;
  datePrescribed: string;
}

/**
 *  METRICS
 **/
export enum MetricId {
  bloodPressure = 'bloodPressure',
  cholesterolTotal = 'cholesterolTotal',
  heartRate = 'heartRate',
  hemoglobinA1c = 'hemoglobinA1c',
  weight = 'weight',
}

export enum MetricName {
  bloodPressure = 'Blood Pressure',
  cholesterolTotal = 'Cholesterol (Total)',
  heartRate = 'Heart Rate',
  hemoglobinA1c = 'Hemoglobin A1c',
  weight = 'Weight',
}

export type MetricValue = boolean | number | string;

export type MetricRecord = {
  [key in MetricId]: MetricValue;
};

export interface MetricItem extends Item, MetricRecord {
  type: ItemType.METRIC;
}

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

export type MetricsBuilder = () => MetricItem[];

export interface TableMetric {
  date: string;
  key: string;
  metric: MetricName;
  metricId: MetricId;
  value: MetricValue;
}

/**
 * NOTES
 */
export interface Note extends Item {
  staff: string;
  note: string;
}

export type NoteBuilder = (note: string) => Note;
export type NotesBuilder = () => Note[];

/**
 * BACKGROUND
 */
export interface PatientBackground extends Item {
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

export type BackgroundBuilder = () => PatientBackground;
export type DashboardBackground = Partial<PatientBackground>;

export interface PatientStatistic {
  title: string;
  value: string | number;
}

/**
 * CONDITIONS
 */
export type Condition = 'diabetes' | 'highCholesterol' | 'hypertension';
export const CONDITIONS: Condition[] = [
  'diabetes',
  'highCholesterol',
  'hypertension',
];

export type PatientConditions = string[];

export type Conditions = Condition[];

export interface ConditionItem extends Item, ConditionValue {}

export type ConditionValue = {
  [key in Condition]?: boolean;
};

export type ConditionsBuilder = () => Conditions;
