import { IProperty, IPropertyImage } from '../../meta/interfaces';
import { generate } from '../lib/api';
import faker from 'faker';

export const properties = generate<IProperty>(10, propertyIndex => {
	const images = generate<IPropertyImage>(5, imageIndex => {
		return {
			id: faker.random.uuid(),
			src: `https://picsum.photos/id/${propertyIndex + 100}/300/200`,
			title: faker.lorem.sentence(),
			isDefault: imageIndex === 0,
		};
	});

	return {
		id: propertyIndex.toString(),
		title: faker.address.streetAddress(),
		images,
	};
});
