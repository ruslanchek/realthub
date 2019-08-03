import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Wrapper } from '../../components/Wrapper';
import { Nav } from '../../components/Nav';

interface Props {
	userAgent: string | undefined;
}

const Page: NextPage<Props> = () => {
	const router = useRouter();

	console.log(router);

	return (
		<Wrapper>
			<Nav />
			<div>xx</div>
		</Wrapper>
	);
};

export default Page;
