import axios, { AxiosResponse } from 'axios';
import { Id, Item } from './types';

export const getItem = async (
  url: string,
  params: Item
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: 'get',
      url,
      params,
    });
    return JSON.parse(response.data.body);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getItems = async (
  url: string,
  params: Id
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: 'get',
      url,
      params,
    });
    return JSON.parse(response.data.body);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postItem = async (
  url: string,
  data: unknown
): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url,
      data,
    });
    const { status } = await response;
    return +status === 201;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateItem = async (
  url: string,
  data: unknown
): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url,
      data,
    });
    const { status } = await response;
    return +status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteItem = async (url: string, data: Item): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url,
      data,
    });
    const { status } = await response;
    return +status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
