import axios, { AxiosResponse } from 'axios';

export const get = async (
  url: string,
  params: any
): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axios({
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

export const post = async (url: string, data: any): Promise<number> => {
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
