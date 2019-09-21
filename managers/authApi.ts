import fetch from 'isomorphic-unfetch';
import { IMe, IAuth, IApiResponse } from '../meta/interfaces';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';

export const REGISTER_URL = `${process.env.API_URL}/auth/register`;
export const ME_URL = `${process.env.API_URL}/auth/me`;

const setToken = (token: string) => {
  setCookie(undefined, 'token', token, {});
};

const getToken = (context?: NextPageContext): string | undefined => {
  return parseCookies(context).token;
};

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export const getAuthHeaders = (token: string): { Authorization: string } => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const authRegister = async (
  model: IRegisterFormModel,
): Promise<IApiResponse<IAuth> | undefined> => {
  const result = await fetch(REGISTER_URL, {
    method: 'POST',
    body: JSON.stringify(model),
  });
  const response = await result.json();

  if (response.data) {
    setToken(response.data.token);

    return response.data;
  } else {
    return undefined;
  }
};

export const getMe = async (
  context?: NextPageContext,
): Promise<IMe | undefined> => {
  const token = getToken(context);

  if (token) {
    const response = await fetch(ME_URL, {
      headers: getAuthHeaders(token),
    });

    return await response.json();
  }

  return undefined;
};
