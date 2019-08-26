import {
	IProperty,
	IPropertyImage,
	IPropertyParam,
} from '../../meta/interfaces';
import { generate } from '../lib/api';
import faker from 'faker';

export const properties = generate<IProperty>(10, propertyIndex => {
	const images = generate<IPropertyImage>(5, imageIndex => {
		return {
			id: faker.random.uuid(),
			src: `https://picsum.photos/id/${propertyIndex + 30}/300/200`,
			title: faker.lorem.sentence(),
			isDefault: imageIndex === 0,
		};
	});

	const params = generate<IPropertyParam>(2, () => {
		return {
			id: faker.random.uuid(),
			value: faker.random.number({ min: 1, max: 4 }).toString(),
			type: faker.lorem.word(),
		};
	});

	return {
		id: propertyIndex.toString(),
		title: faker.lorem.sentence(),
		price: faker.finance.amount(),
		address: faker.address.streetAddress(),
		params,
		images,
	};
});
