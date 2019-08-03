import { NextApiRequest, NextApiResponse } from 'next';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
	res.json({
		name: 'Hello, ' + req.query.name,
	});
}
