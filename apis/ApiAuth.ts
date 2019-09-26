import { Api } from './Api';
import { API_URLS } from '../common/constants';
import { setCookie } from 'nookies';
import { authStore } from '../stores/authStore';

export interface IApiAuthRegisterModel {
  email: string;
  password: string;
}

export interface IApiAuthLoginModel {
  email: string;
  password: string;
}

export interface IApiAuthMe {
  id: string;
  email: string;
}

export interface IApiAuthToken {
  token: string;
}

export class ApiAuth extends Api {
  private static setToken(token: string) {
    setCookie(undefined, 'token', token, {});
  }

  public static async login(model: IApiAuthLoginModel) {
    const result = await this.fetch<IApiAuthLoginModel, IApiAuthToken>(
      API_URLS.AUTH_LOGIN,
      'post',
      model,
    );

    if (result.data && result.data.token) {
      this.setToken(result.data.token);
      await this.getMe();
    }

    return result;
  }

  public static async register(model: IApiAuthRegisterModel) {
    const result = await this.fetch<IApiAuthRegisterModel, IApiAuthToken>(
      API_URLS.AUTH_REGISTER,
      'post',
      model,
    );

    if (result.data && result.data.token) {
      this.setToken(result.data.token);
      await this.getMe();
    }

    return result;
  }

  public static async getMe() {
    const result = await this.fetch<{}, IApiAuthMe>(
      API_URLS.AUTH_ME,
      'get',
      undefined,
      undefined,
      true,
    );

    if (result.data) {
      authStore.setState({
        me: result.data,
      });
    }

    return result;
  }
}
