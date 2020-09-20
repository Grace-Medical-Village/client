import axios, { AxiosResponse } from 'axios';
import { Metric, MetricItem } from '../metrics/types';
import { PatientBackground, PatientId } from '../patient/types';

export const get = async (
  url: string,
  params: Metric | PatientId
): Promise<AxiosResponse<MetricItem | PatientBackground | any>> => {
  try {
    const response: AxiosResponse<
      MetricItem | PatientBackground | any
    > = await axios({
      method: 'get',
      url,
      params,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const post = async (
  url: string,
  data: MetricItem | PatientBackground
): Promise<number> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url,
      data,
    });
    const { status } = await response;
    return +status;
  } catch (error) {
    console.error(error);
    return 400; // TODO
  }
};
