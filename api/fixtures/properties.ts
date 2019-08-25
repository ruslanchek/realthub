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
			title: '2 Beds',
		};
	});

	return {
		id: propertyIndex.toString(),
		title: faker.lorem.sentence(),
		address: faker.address.streetAddress(),
		params,
		images,
	};
});
