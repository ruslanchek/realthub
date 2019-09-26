import { Api } from './Api';
import { API_URLS } from '../common/constants';
import { NextPageContext } from 'next';

export interface IApiPropertyItemImage {
  id: string;
  src: string;
  title: string;
  isDefault?: boolean;
}

export interface IApiPropertyItemParam {
  id: string;
  value: string;
  type: string;
}

export interface IApiPropertyItem {
  id: string;
  title: string;
  address: string;
  price: string;
  images: IApiPropertyItemImage[];
  params: IApiPropertyItemParam[];
  geo: {
    lat: number;
    lng: number;
  };
}

export class ApiProperty extends Api {
  public static async getPropertyList(context?: NextPageContext) {
    return await this.fetch<{}, IApiPropertyItem[]>(
      API_URLS.PROPERTY_LIST,
      'get',
      undefined,
      context,
    );
  }

  public static async getPropertyItem(id: string, context?: NextPageContext) {
    return await this.fetch<{}, IApiPropertyItem>(
      API_URLS.PROPERTY_ITEM.replace(':id', id),
      'get',
      undefined,
      context,
    );
  }
}
