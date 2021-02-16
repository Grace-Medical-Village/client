import { Auth } from 'aws-amplify';
import axios, { AxiosResponse } from 'axios';
import {
  DeleteMedication,
  GetConditions,
  GetItem,
  GetItems,
  GetMedicationCategories,
  GetMedications,
  Item,
  Medication,
  MedicationCategory,
  PostItem,
  PostMedication,
  PutItem,
  ResponseStatus,
} from '../../utils/types';

const { REACT_APP_URL } = process.env;

const canSend = () => {
  if (!REACT_APP_URL) throw new Error('API URL is undefined');
};

const getAuthorization = async () => {
  canSend();
  return {
    Authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`,
  };
};

export const deleteMedication: DeleteMedication = async (id) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/medication`,
      headers: authorization,
      params: {
        id,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const getConditions: GetConditions = async () => {
  const authorization = await getAuthorization();
  let data: string[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/conditions`,
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getMedications: GetMedications = async () => {
  const authorization = await getAuthorization();
  let data: Medication[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/medications`,
      headers: authorization,
    });
    console.log(response);
    data = response?.data?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getMedicationCategories: GetMedicationCategories = async () => {
  const authorization = await getAuthorization();
  let data: MedicationCategory[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/medication-categories`,
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const postMedication: PostMedication = async (
  name,
  strength,
  category_id
) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/medication`,
      headers: authorization,
      data: {
        name,
        strength,
        category_id,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

//----------------------------------------------------------------

export const getItem: GetItem = async (params) => {
  const authorization = await getAuthorization();
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/patient`,
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
      url: `${REACT_APP_URL}/patients`,
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
      url: `${REACT_APP_URL}/patient`,
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
      url: `${REACT_APP_URL}/patient`,
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
      url: `${REACT_APP_URL}/patient`,
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
