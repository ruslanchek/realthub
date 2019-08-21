export interface IApiResponse<T = any> {
	data?: T;
	error?: string;
}

export interface IProperty {
	id: string;
	title: string;
}
