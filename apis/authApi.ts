import axios from 'axios';
import { IApiResponse } from '../common/interfaces';
import { parseCookies, setCookie } from 'nookies';
import { NextPageContext } from 'next';
import { API_URLS } from '../common/constants';
import { authStore } from '../stores/authStore';

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export interface ILoginFormModel {
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

export const authLogin = async (
  model: IRegisterFormModel,
): Promise<IAuth | undefined> => {
  try {
    const { data } = await axios.post<IApiResponse<IAuth>>(
      API_URLS.AUTH_LOGIN,
      model,
    );

    if (data.data) {
      setToken(data.data.token);
      await getMe();
      return data.data;
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
};

export const authRegister = async (
  model: IRegisterFormModel,
): Promise<IAuth | undefined> => {
  try {
    const { data } = await axios.post<IApiResponse<IAuth>>(
      API_URLS.AUTH_REGISTER,
      model,
    );

    if (data.data) {
      setToken(data.data.token);
      await getMe();
      return data.data;
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
};

export const getMe = async (context?: NextPageContext) => {
  const token = getToken(context);

  if (token) {
    try {
      const { data } = await axios.get<IApiResponse<IMe>>(API_URLS.AUTH_ME, {
        headers: getAuthHeaders(token),
      });

      authStore.setState({
        me: data.data,
      });
    } catch (e) {
      authStore.setState({
        me: undefined,
      });
    }
  } else {
    authStore.setState({
      me: undefined,
    });
  }
};
