export enum MetricId {
  bloodPressure = 'bloodPressure',
  cholesterolTotal = 'cholesterolTotal',
  heartRate = 'heartRate',
  hemoglobinA1c = 'hemoglobinA1c',
  weight = 'weight',
}

export interface Item {
  id: string;
  key: string | MetricId;
}

export interface MetricItem extends Item {
  date: string;
  value: string;
}

export interface PostMetricItem extends Item {
  [x: string]: MetricValue;
}

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

export interface TableMetric extends MetricItem {
  name: string;
}
