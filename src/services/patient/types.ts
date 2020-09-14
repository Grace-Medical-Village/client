export interface Metric {
  disabled: boolean;
  key: string;
  name?: string;
  type?: string;
  max?: number;
  default?: number;
  min?: number;
  status?: string;
  step?: number;
  precision?: number;
}
