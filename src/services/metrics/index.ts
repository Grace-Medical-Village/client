import { message } from 'antd';
import { get, post } from '../api';
import {
  MetricItem,
  MetricName,
  MetricId,
  MetricObject,
  MetricBuilderOption,
} from './types';

const { REACT_APP_PATIENT_API } = process.env;

export function getMetric(item: MetricItem): Promise<MetricItem> {
  if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

  return Promise.resolve(
    get(REACT_APP_PATIENT_API, item).then(({ data, status }) => {
      if (status === 200) return data;
    })
  );
}

export function getMetrics(id: string): Promise<MetricObject | void> {
  const requests: Promise<MetricItem>[] = [];
  for (const metric in MetricId) {
    const item: MetricItem = {
      id,
      key: metric,
    };
    requests.push(getMetric(item));
  }

  return Promise.allSettled(requests)
    .then(
      (results: PromiseSettledResult<MetricItem>[]): MetricObject => {
        const metrics: MetricObject = {};
        results.forEach((res: PromiseSettledResult<MetricItem>) => {
          if (res.status === 'fulfilled') {
            const { key } = res.value;
            metrics[key] = res.value;
          }
        });
        return metrics;
      }
    )
    .catch((error: Error) => console.error(error));
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
