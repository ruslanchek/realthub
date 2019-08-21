import { NextApiResponse } from 'next';

export function times(
	repeatNumber: number,
	callback: (index: number) => void,
): void {
	for (let i = 0; i < repeatNumber; i += 1) {
		callback(i);
	}
}

export function generate<T = any>(
	amount: number,
	generator: (index: number) => T,
): T[] {
	const generation: T[] = [];

	times(amount, index => {
		generation.push(generator(index));
	});

	return generation;
}

export function getById<T = any>(id: string, array: T[]): T | undefined {
	return array.find(item => (item as any).id === id);
}

export function apiNotFound(res: NextApiResponse): void {
	res.status(404);
	res.json({
		error: 'E_NOT_FOUND',
	});
}
