import { Auth } from 'aws-amplify';
import axios, { AxiosResponse } from 'axios';
import {
  Condition,
  DeleteMedication,
  DeletePatientCondition,
  DeletePatientMedication,
  DeletePatientMetric,
  DeletePatientNote,
  GetConditions,
  GetMedicationCategories,
  GetMedications,
  GetMetrics,
  GetPatient,
  GetPatientsByBirthdate,
  GetPatientsByName,
  Medication,
  MedicationCategory,
  Metric,
  PatientData,
  PatientSearchResult,
  PostMedication,
  PostPatient,
  PostPatientCondition,
  PostPatientMedication,
  PostPatientMetric,
  PostPatientNote,
  PutMedication,
  PutPatient,
  PutPatientNote,
  RequestSuccess,
  ResponseStatus,
} from '../../utils/types';

const { REACT_APP_URL } = process.env;

const canSend = () => {
  if (!REACT_APP_URL) throw new Error('API URL is undefined');
};

export const requestSuccess: RequestSuccess = (n) => n >= 200 && n <= 299;

const getAuthorization = async () => {
  canSend();
  return {
    Authorization: `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`,
  };
};

export const deletePatientCondition: DeletePatientCondition = async (id) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/patients/condition/${id}`,
      headers: authorization,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const deletePatientMedication: DeletePatientMedication = async (id) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/patients/medication/${id}`,
      headers: authorization,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const deletePatientMetric: DeletePatientMetric = async (id) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/patients/metric/${id}`,
      headers: authorization,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const deletePatientNote: DeletePatientNote = async (id) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/patients/note/${id}`,
      headers: authorization,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const deleteMedication: DeleteMedication = async (id: number) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'delete',
      url: `${REACT_APP_URL}/medications/${id}`,
      headers: authorization,
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
  let data: Condition[] = [];
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
    data = response?.data;
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
      url: `${REACT_APP_URL}/medications/categories`,
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getMetrics: GetMetrics = async () => {
  const authorization = await getAuthorization();
  let data: Metric[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/metrics`,
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getPatient: GetPatient = async (id) => {
  const authorization = await getAuthorization();
  let data: PatientData = {};
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/patients/${id}`,
      headers: authorization,
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getPatientsByBirthdate: GetPatientsByBirthdate = async (
  birthdate
) => {
  const authorization = await getAuthorization();
  let data: PatientSearchResult[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/patients`,
      headers: authorization,
      params: {
        birthdate,
      },
    });
    data = response?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getPatientsByName: GetPatientsByName = async (name) => {
  const authorization = await getAuthorization();
  let data: PatientSearchResult[] = [];
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/patients`,
      headers: authorization,
      params: {
        name,
      },
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
  categoryId
) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/medications`,
      headers: authorization,
      data: {
        name,
        strength,
        categoryId,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const postPatient: PostPatient = async (newPatient) => {
  const authorization = await getAuthorization();

  const res: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patients`,
      headers: authorization,
      data: {
        ...newPatient,
      },
    });

    const { data, status, statusText } = response;
    res.status = status;
    res.statusText = statusText;
    if (data.id) {
      res.id = data.id;
    }
  } catch (error) {
    console.error(error);
    res.status = error.response.status;
    res.statusText = error.response.statusText;
  }
  return res;
};

export const postPatientCondition: PostPatientCondition = async (
  patientId,
  conditionId
) => {
  const authorization = await getAuthorization();

  const res: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patients/condition`,
      headers: authorization,
      data: {
        patientId,
        conditionId,
      },
    });
    const { data, status, statusText } = response;
    res.status = status;
    res.statusText = statusText;
    if (data.id) {
      res.id = data.id;
    }
  } catch (error) {
    console.error(error);
  }
  return res;
};

export const postPatientMedication: PostPatientMedication = async (
  patientId,
  medicationId
) => {
  const authorization = await getAuthorization();

  let result: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patients/medication`,
      headers: authorization,
      data: {
        patientId,
        medicationId,
      },
    });
    result = buildPostResult(response);
  } catch (error) {
    console.error(error);
  }
  return result;
};

export const postPatientMetric: PostPatientMetric = async (
  patientId,
  metricId,
  value,
  comment
) => {
  const authorization = await getAuthorization();

  let result: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patients/metric`,
      headers: authorization,
      data: {
        patientId,
        metricId,
        value: value.toString().trim(),
        comment,
      },
    });
    result = buildPostResult(response);
  } catch (error) {
    if (error.isAxiosError) {
      result.error = error.response?.data?.error ?? null;
    } else {
      console.error(error);
    }
  }
  return result;
};

export const postPatientNote: PostPatientNote = async (patientId, note) => {
  const authorization = await getAuthorization();

  let result: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patients/note`,
      headers: authorization,
      data: {
        patientId,
        note,
      },
    });
    result = buildPostResult(response);
  } catch (error) {
    console.error(error);
  }
  return result;
};

export const putMedication: PutMedication = async (med) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_URL}/medications`,
      headers: authorization,
      data: med,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const putPatient: PutPatient = async (id, patient) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_URL}/patients/${id}`,
      headers: authorization,
      data: patient,
    });
    console.log(response);
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const putPatientNote: PutPatientNote = async (id, note) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'put',
      url: `${REACT_APP_URL}/patients/note/${id}`,
      headers: authorization,
      data: note,
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

const buildPostResult = (response: AxiosResponse): ResponseStatus => {
  const { data = {}, status, statusText } = response;
  return {
    status,
    statusText,
    id: data?.id ?? null,
    createdAt: data?.createdAt ?? null,
    modifiedAt: data?.modifiedAt ?? null,
    error: data?.error ?? null,
  };
};
