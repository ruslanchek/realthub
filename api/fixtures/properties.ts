import { IProperty } from '../../meta/interfaces';
import { generate } from '../lib/api';
import faker from 'faker';

export const properties = generate<IProperty>(10, () => {
	return {
		id: faker.random.uuid(),
		title: faker.address.streetAddress(),
	};
});
