import { IProperty } from '../../meta/interfaces';
import { generate } from '../lib/api';
import faker from 'faker';

export const properties = generate<IProperty>(10, index => {
	return {
		id: index.toString(),
		title: faker.address.streetAddress(),
	};
});
