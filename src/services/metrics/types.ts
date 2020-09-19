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
  [date: string]: MetricValue;
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
