import { NextApiRequest, NextApiResponse } from 'next';
import { getById, apiNotFound, apiResponse } from '../../../api/lib/api';
import { properties } from '../../../api/fixtures/properties';

export default function(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	const data = getById(id.toString(), properties);

	if (data) {
		apiResponse(res, { data });
	} else {
		apiNotFound(res);
	}
}
