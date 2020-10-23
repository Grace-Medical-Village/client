import axios, { AxiosResponse } from 'axios';
import { Id, Item } from './types';

export const get = async (
  url: string,
  params: Item
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await axios({
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

export const query = async (
  url: string,
  params: Id
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await axios({
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

export const post = async (url: string, data: unknown): Promise<number> => {
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
    return 400;
  }
};

export const update = async (url: string, data: unknown): Promise<number> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url,
      data,
    });
    const { status } = await response;
    return +status;
  } catch (error) {
    console.error(error);
    return 400;
  }
};

export const deleteRecord = async (
  url: string,
  data: Item
): Promise<number> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url,
      data,
    });
    const { status } = await response;
    return +status;
  } catch (error) {
    console.error(error);
    return 400;
  }
};
