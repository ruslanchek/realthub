import axios from 'axios';
import { IApiResponse } from '../common/interfaces';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';
import { API_URLS } from '../common/constants';

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export interface IMe {
  id: string;
  email: string;
}

export interface IAuth {
  token: string;
}

const setToken = (token: string) => {
  setCookie(undefined, 'token', token, {});
};

const getToken = (context?: NextPageContext): string | undefined => {
  return parseCookies(context).token;
};

export const getAuthHeaders = (token: string): { Authorization: string } => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const authRegister = async (
  model: IRegisterFormModel,
): Promise<IAuth | undefined> => {
  const { data } = await axios.post<IApiResponse<IAuth>>(
    API_URLS.AUTH_REGISTER,
    model,
  );

  if (data.data) {
    setToken(data.data.token);

    return data.data;
  } else {
    return undefined;
  }
};

export const getMe = async (
  context?: NextPageContext,
): Promise<IMe | undefined> => {
  const token = getToken(context);

  if (token) {
    const { data } = await axios.get<IApiResponse<IMe>>(API_URLS.AUTH_ME, {
      headers: getAuthHeaders(token),
    });

    return data.data;
  }

  return undefined;
};
