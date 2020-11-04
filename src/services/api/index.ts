import axios, { AxiosResponse } from 'axios';
import { GetItem, GetItems, Item, PostItem, PutItem } from '../types';

const { REACT_APP_API } = process.env;

export const getItem: GetItem = async (params) => {
  if (!REACT_APP_API) throw new Error('API URL is undefined'); // TODO DRY
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_API}/patient`,
      params,
    });
    const res = JSON.parse(response?.data?.body) ?? {};

    if (Object.entries(res).length > 0) res.statusCode = 200;
    else res.statusCode = 404;

    return res;
  } catch (error) {
    console.error(error);
    const e = {
      statusCode: error?.response?.status ?? 500,
      error: error?.response?.statusText ?? 'Error',
    };
    console.log(e);
    return e;
  }
};

export const getItems: GetItems = async (params) => {
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

export const postItem: PostItem = async (data) => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_API}/patient`,
      data,
    });
    return +response?.data?.statusCode === 201 ?? false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putItem: PutItem = async (data) => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_API}/patient`,
      data,
    });
    return +response?.data?.statusCode === 200 ?? false;
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
