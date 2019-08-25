export interface IApiResponse<T = any> {
	data?: T;
	error?: string;
}

export interface IPropertyImage {
	id: string;
	src: string;
	title: string;
	isDefault?: boolean;
}

export interface IPropertyParam {
	id: string;
	title: string;
}

export interface IProperty {
	id: string;
	title: string;
	address: string;
	images: IPropertyImage[];
	params: IPropertyParam[];
}
