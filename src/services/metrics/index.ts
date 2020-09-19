import { message } from 'antd';
import { get, post } from '../api';
import {
  MetricItem,
  MetricName,
  MetricId,
  Item,
  MetricObject,
  MetricBuilderOption,
} from './types';

const { REACT_APP_PATIENT_API } = process.env;

// TODO
export async function getMetric(item: Item): Promise<MetricItem> {
  if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

  const res = await get(REACT_APP_PATIENT_API, item).then(
    ({ data, status }) => {
      if (status === 200) return data;
    }
  );
  return res;
}

export async function getMetrics(id: string): Promise<MetricObject> {
  const requests: Promise<MetricItem>[] = [];
  for (const metric in MetricId) {
    const item: Item = {
      id,
      key: metric,
    };
    requests.push(getMetric(item));
  }

  const patientMetrics: MetricObject = {};
  Promise.all(requests).then((results: MetricItem[]): void => {
    results.forEach((res: MetricItem) => {
      const { key } = res;
      patientMetrics[key] = res;
    });
  });
  return patientMetrics;
}

export async function postMetric(item: MetricItem): Promise<boolean> {
  if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

  let postSuccess = false;
  await post(REACT_APP_PATIENT_API, item).then((status) => {
    postSuccess = status === 200;
    if (postSuccess) {
      message.success('Metric Saved');
    } else {
      message.error('Failed to Save Metric');
    }
  });

  return postSuccess;
}

export const allMetrics: MetricBuilderOption[] = [
  {
    key: 'noMetric',
    name: '',
    disabled: true,
    max: 0,
    min: 0,
    step: 0,
    type: '',
  },
  {
    key: 'bloodPressure',
    name: MetricName.bloodPressure,
    type: ' mm Hg',
    disabled: false,
    max: 300,
    min: 0,
    default: 100,
    step: 1,
  },
  {
    key: 'cholesterolTotal',
    name: MetricName.cholesterolTotal,
    type: ' mmol/L',
    disabled: false,
    max: 300,
    min: 0,
    default: 120,
    step: 1,
  },
  {
    key: 'heartRate',
    name: MetricName.heartRate,
    type: 'bpm',
    disabled: false,
    max: 300,
    min: 0,
    default: 60,
    step: 1,
  },
  {
    key: 'hemoglobinA1c',
    name: MetricName.hemoglobinA1c,
    type: '%',
    disabled: false,
    max: 50,
    min: 0,
    default: 5.0,
    step: 0.1,
  },
  {
    key: 'weight',
    name: MetricName.weight,
    type: ' lbs',
    disabled: false,
    max: 800,
    default: 150,
    min: 0,
    step: 0.1,
    precision: 1,
  },
];
