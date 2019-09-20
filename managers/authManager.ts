import axios from 'axios';
// import { setCookie, eraseCookie } from './cookieManager';

const REGISTER_URL = `${process.env.API_URL}/auth/register`;

// const setToken = (token: string) => {
//   setCookie('token', token);
// };

// const removeToken = () => {
//   eraseCookie('token');
// };

interface IAuthSuccessResponse {
  token: string;
}

export interface IRegisterFormModel {
  email: string;
  password: string;
}

export const authRegister = async (model: IRegisterFormModel) => {
  try {
    const { data } = await axios.post<IAuthSuccessResponse>(
      REGISTER_URL,
      model,
    );

    console.log(data);
  } catch (e) {
    console.log(e.response);
  }
};
