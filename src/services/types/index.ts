export interface Id {
  id: string;
}

export interface Item extends Id {
  key: string;
  createdAt?: number;
}

// TODO -> Improve ResponseBody
export interface Response {
  body?: ResponseBody;
  error?: string;
  statusCode?: number;
}
export type ResponseBody = string;

export interface Medication extends Item {
  medicationName: string;
  dosage: string | number;
  dosageType: string;
  active: boolean;
  datePrescribed: string;
}

export enum MetricId {
  bloodPressure = 'bloodPressure',
  cholesterolTotal = 'cholesterolTotal',
  heartRate = 'heartRate',
  hemoglobinA1c = 'hemoglobinA1c',
  weight = 'weight',
}

export interface MetricItem extends Item {
  [attribute: string]: MetricValue;
}

export type MetricObject = Record<string, MetricItem>;

export enum MetricName {
  bloodPressure = 'Blood Pressure',
  cholesterolTotal = 'Cholesterol (Total)',
  heartRate = 'Heart Rate',
  hemoglobinA1c = 'Hemoglobin A1c',
  weight = 'Weight',
}

export type MetricValue = boolean | number | string;

export interface MetricBuilderOption {
  disabled: boolean;
  key: string;
  name?: string | MetricName;
  type?: string;
  max?: number;
  default?: number;
  min?: number;
  status?: string;
  step?: number;
  precision?: number;
}

export interface TableMetric {
  date: string;
  key: string;
  metric: MetricName;
  metricId: MetricId;
  value: MetricValue;
}

export interface PatientNote extends Item {
  type: 'note';
  staff: string;
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