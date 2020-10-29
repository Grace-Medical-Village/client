import axios, { AxiosResponse } from 'axios';
import { Id, Item, Response } from '../types';

const { REACT_APP_API } = process.env;

export const getItem = async (params: Item): Promise<Response> => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_API}/patient`,
      params,
    });
    return JSON.parse(response?.data?.body) ?? {};
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getItems = async (url: string, params: Id): Promise<Response> => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_API}/patients`,
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
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_API}/patient`,
      data,
    });
    const { status } = await response;
    return +status === 201;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putItem = async (data: unknown): Promise<boolean> => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_API}/patient`,
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
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_API}/patient`,
      data,
    });
    const { status } = await response;
    return +status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
