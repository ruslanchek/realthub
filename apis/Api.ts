import axios, { Method } from 'axios';
import { NextPageContext } from 'next';
import { parseCookies, setCookie } from 'nookies';

interface IApiFieldError<TInputModel> {
  property: keyof TInputModel;
  errors: string[];
}

interface IApiAuthHeaders {
  Authorization: string;
}

interface IApiResult<TInputModel, TOutputModel> {
  error: boolean;
  fieldsErrors?: IApiFieldError<TInputModel>[];
  generalError?: string;
  data?: TOutputModel;
}

export abstract class Api {
  private static getToken(ctx?: NextPageContext): string | undefined {
    return parseCookies(ctx).token;
  }

  private static getAuthHeaders(ctx?: NextPageContext): IApiAuthHeaders {
    return {
      Authorization: `Bearer ${this.getToken(ctx)}`,
    };
  }

  protected static setToken(token?: string) {
    setCookie(undefined, 'token', token || '', {});
  }

  public static async fetch<TInputModel = any, TOutputModel = any>(
    url: string,
    method: Method,
    data?: TInputModel,
    ctx?: NextPageContext,
    needAuth?: boolean,
  ): Promise<IApiResult<TInputModel, TOutputModel>> {
    try {
      let headers = {};

      if (needAuth) {
        if (!this.getToken()) {
          return {
            error: true,
            generalError: 'NO_TOKEN',
          };
        }

        headers = {
          ...headers,
          ...this.getAuthHeaders(ctx),
        };
      }

      const result = await axios.request({
        url,
        method,
        data,
        headers,
      });

      return {
        error: false,
        data: result.data.data,
      };
    } catch (e) {
      const result = e.response;
      const generalError = this.parseGeneralError(result.data.message);
      const fieldsErrors = this.parseFieldsErrors<TInputModel>(
        result.data.message,
      );

      if (generalError === 'INVALID_TOKEN' || generalError === 'INVALID_USER') {
        this.setToken('');
      }

      return {
        error: true,
        fieldsErrors,
        generalError,
      };
    }
  }

  protected static parseGeneralError(message: any): string | undefined {
    if (message && typeof message === 'string') {
      return message;
    } else {
      return undefined;
    }
  }

  protected static parseFieldsErrors<TInputModel>(
    messages: any,
  ): Array<IApiFieldError<TInputModel>> | undefined {
    if (messages && typeof messages === 'object') {
      return messages.map((message: any) => {
        const { property, constraints } = message;
        const errors = [];

        if (constraints) {
          for (let key in constraints) {
            errors.push(constraints[key]);
          }
        }

        return {
          property,
          errors,
        };
      });
    } else {
      return undefined;
    }
  }
}
