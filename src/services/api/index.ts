import { Auth } from 'aws-amplify';
import axios, { AxiosResponse } from 'axios';
import {
  GetItem,
  GetItems,
  GetMedications,
  Item,
  Medication,
  PostItem,
  PutItem,
} from '../../utils/types';

const { REACT_APP_API } = process.env;

const canSend = () => {
  if (!REACT_APP_API) throw new Error('API URL is undefined');
};

const getAuthorization = async () => {
  canSend();
  return {
    Authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`,
  };
};

export const getMedications: GetMedications = async () => {
  const authorization = await getAuthorization();
  let data: Medication[] = [];
  try {
    console.log(authorization);
    const response = await axios({
      method: 'get',
      url: 'http://localhost:4000/local/medications',
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const getItem: GetItem = async (params) => {
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_API}/patient`,
      headers: {
        ...authorization,
      },
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
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_API}/patients`,
      headers: {
        ...authorization,
      },
      params,
    });
    const res = JSON.parse(response?.data?.body) ?? {};

    if (Object.entries(res).length > 0) res.statusCode = 200;
    else res.statusCode = 404;

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const postItem: PostItem = async (data) => {
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_API}/patient`,
      headers: {
        ...authorization,
      },
      data,
    });
    return +response?.data?.statusCode === 201 ?? false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const putItem: PutItem = async (id, key, data) => {
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_API}/patient`,
      headers: {
        ...authorization,
      },
      params: {
        id,
        key,
      },
      data,
    });
    return +response?.data?.statusCode === 200 ?? false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteItem = async (url: string, data: Item): Promise<boolean> => {
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_API}/patient`,
      headers: { ...authorization },
      data,
    });
    const { status } = await response;
    return +status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
};
