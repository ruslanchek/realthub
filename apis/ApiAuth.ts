import Router from 'next/router';
import { Api } from './Api';
import { API_URLS, PATHS } from '../common/constants';
import { authStore } from '../stores/authStore';
import { NextPageContext } from 'next';

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
  public static redirectToAuth(ctx?: NextPageContext) {
    if (process.browser) {
      Router.push(PATHS.AUTH_LOGIN);
    } else {
      if (ctx && ctx.res) {
        ctx.res.writeHead(301, { Location: PATHS.AUTH_LOGIN });
        ctx.res.end();
      }
    }
  }

  public static notFound(ctx: NextPageContext) {
    if (ctx && ctx.res) {
      ctx.res.statusCode = 404;
    }
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

  public static async getMe(ctx?: NextPageContext) {
    const result = await this.fetch<{}, IApiAuthMe>(
      API_URLS.AUTH_ME,
      'get',
      undefined,
      ctx,
      true,
    );

    if (result.data) {
      authStore.setState({
        me: result.data,
      });
    } else {
      authStore.setState({
        me: undefined,
      });
    }

    return result;
  }
}
