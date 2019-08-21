import { NextApiRequest, NextApiResponse } from 'next';
import { properties } from '../../../api/fixtures/properties';

export default function(_req: NextApiRequest, res: NextApiResponse) {
	res.json({
		data: properties,
	});
}
