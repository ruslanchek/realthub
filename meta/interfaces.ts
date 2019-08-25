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

export interface IProperty {
	id: string;
	title: string;
	images: IPropertyImage[];
}
