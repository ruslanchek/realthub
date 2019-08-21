import { NextApiRequest, NextApiResponse } from 'next';
import { getById, apiNotFound } from '../../../api/lib/api';
import { properties } from '../../../api/fixtures/properties';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	const data = getById(id as string, properties);

	if (data) {
		res.json({
			data,
		});
	} else {
		apiNotFound(res);
	}
}
