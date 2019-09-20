import axios from 'axios';
import { setCookie, getCookie } from './cookieManager';
import { authStore } from '../stores/authStore';
import { IMe, IAuth } from '../meta/interfaces';

const REGISTER_URL = `${process.env.API_URL}/auth/register`;
const ME_URL = `${process.env.API_URL}/auth/me`;

const setToken = (token: string) => {
  setCookie('token', token);
};

const getToken = (): string | undefined => {
  return getCookie('token');
};

// const removeToken = () => {
//   eraseCookie('token');
// };

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export const getAuthHeaders = (): { Authorization: string } => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};

export const checkAuth = async (): Promise<boolean> => {
  const token = getToken();

  if (token) {
    try {
      await getMe();
      return true;
    } catch (e) {}
  }

  return false;
};

export const authRegister = async (model: IRegisterFormModel) => {
  try {
    const { data } = await axios.post<IAuth>(REGISTER_URL, model);

    setToken(data.token);
    getMe();

    authStore.setState({
      authorized: true,
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const getMe = async () => {
  try {
    const { data: me } = await axios.get<IMe>(ME_URL, {
      headers: getAuthHeaders(),
    });

    authStore.setState({
      me,
    });
  } catch (e) {
    console.log(e.response);
  }
};
