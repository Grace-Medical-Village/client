import { Auth } from 'aws-amplify';
import axios, { AxiosResponse } from 'axios';
import {
  DeleteMedication,
  GetConditions,
  GetMedicationCategories,
  GetMedications,
  GetMetrics,
  GetPatient,
  GetPatientMedications,
  GetPatientMetrics,
  GetPatientNotes,
  GetPatientsByBirthdate,
  GetPatientsByName,
  Medication,
  MedicationCategory,
  Metric,
  PatientData,
  PatientMedication,
  PatientMetric,
  PatientNote,
  PatientSearchResult,
  PostMedication,
  PostPatientMedication,
  PostPatientMetric,
  PostPatientNote,
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
    data = response?.data?.data;
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
    data = response?.data?.data;
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getPatient: GetPatient = async (
  id,
  patient,
  conditions,
  medications,
  metrics,
  notes
) => {
  const authorization = await getAuthorization();
  let data: PatientData = {};
  try {
    const response: AxiosResponse = await axios({
      method: 'get',
      url: `${REACT_APP_URL}/patient`,
      headers: authorization,
      params: {
        id,
        patient,
        conditions,
        medications,
        metrics,
        notes,
      },
    });
    data = response?.data?.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  return data;
};

export const getPatientMedications: GetPatientMedications = async (id) => {
  let medications: PatientMedication[] = [];
  const data: PatientData = await getPatient(
    id,
    false,
    false,
    true,
    false,
    false
  );
  if (data.medications) medications = data.medications;
  return medications;
};

export const getPatientMetrics: GetPatientMetrics = async (id) => {
  let metrics: PatientMetric[] = [];
  const data: PatientData = await getPatient(
    id,
    false,
    false,
    false,
    true,
    false
  );
  if (data.metrics) metrics = data.metrics;
  return metrics;
};

export const getPatientNotes: GetPatientNotes = async (id) => {
  let notes: PatientNote[] = [];
  const data: PatientData = await getPatient(
    id,
    false,
    false,
    false,
    false,
    true
  );
  if (data.notes) notes = data.notes;
  return notes;
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
    data = response?.data?.data;
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
    data = response?.data?.data;
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
      url: `${REACT_APP_URL}/medication`,
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

export const postPatientMedication: PostPatientMedication = async (
  patientId,
  medicationId
) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patient/medication`,
      headers: authorization,
      data: {
        patientId,
        medicationId,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const postPatientMetric: PostPatientMetric = async (
  patientId,
  metricId,
  value
) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patient/metric`,
      headers: authorization,
      data: {
        patientId,
        metricId,
        value,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};

export const postPatientNote: PostPatientNote = async (patientId, note) => {
  const authorization = await getAuthorization();

  const responseStatus: ResponseStatus = {
    status: 400,
    statusText: 'Server Error',
  };

  try {
    const response: AxiosResponse = await axios({
      method: 'post',
      url: `${REACT_APP_URL}/patient/note`,
      headers: authorization,
      data: {
        patientId,
        note,
      },
    });
    responseStatus.status = response.status;
    responseStatus.statusText = response.statusText;
  } catch (error) {
    console.error(error);
  }
  return responseStatus;
};
