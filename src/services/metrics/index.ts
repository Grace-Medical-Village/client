import { message } from 'antd';
import { get, post } from '../api';
import {
  MetricItem,
  MetricName,
  MetricId,
  Item,
  PostMetricItem,
  MetricBuilderOption,
} from './types';

const { REACT_APP_PATIENT_API } = process.env;

export function getMetrics(id: string): MetricItem[] {
  if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

  const patientMetrics: MetricItem[] = [];
  for (const metric in MetricId) {
    const params: Item = {
      id,
      key: metric,
    };

    get(REACT_APP_PATIENT_API, params).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        const regex = new RegExp(
          /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        );
        const { id, key } = data;
        Object.keys(data).forEach((k: string) => {
          if (regex.test(k)) {
            const record: MetricItem = {
              id: id,
              key: key,
              value: data[k],
              date: k,
            };
            patientMetrics.push(record);
          }
        });
      }
    });
  }

  console.log(patientMetrics);
  return patientMetrics;
}

export function postMetric(item: PostMetricItem): boolean {
  let postSuccess = false;
  if (!REACT_APP_PATIENT_API) throw new Error('Patient API URL is undefined');

  post(REACT_APP_PATIENT_API, item).then((status) => {
    postSuccess = status === 200;
    if (postSuccess) {
      message.success('Metric Saved');
    } else {
      message.error('Unable to Save Metric');
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
