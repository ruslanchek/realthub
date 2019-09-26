import axios, { Method } from 'axios';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';

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
  private static getToken(context?: NextPageContext): string | undefined {
    return parseCookies(context).token;
  }

  private static getAuthHeaders(context?: NextPageContext): IApiAuthHeaders {
    return {
      Authorization: `Bearer ${this.getToken(context)}`,
    };
  }

  public static async fetch<TInputModel = any, TOutputModel = any>(
    url: string,
    method: Method,
    data?: TInputModel,
    context?: NextPageContext,
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
          ...this.getAuthHeaders(context),
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

      return {
        error: true,
        fieldsErrors: this.parseFieldsErrors<TInputModel>(result.data.message),
        generalError: this.parseGeneralError(result.data.message),
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
