import { NextPage } from 'next';
import Link from 'next/link';
import { Wrapper } from '../../components/Wrapper';
import { Nav } from '../../components/Nav';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';

interface IProps {
	response: IApiResponse<IProperty[]>;
}

const Page: NextPage<IProps> = ({ response }) => (
	<Wrapper>
		<PageHead />
		<Nav />
		<main>
			{response.data &&
				response.data.map(item => (
					<div key={item.id}>
						<Link href={`/test/[id]`} as={`/test/${item.id}`} prefetch>
							<a>{item.title}</a>
						</Link>
					</div>
				))}
		</main>
	</Wrapper>
);

Page.getInitialProps = async () => {
	const response = await fetch(`${process.env.API_URL}/property`);
	return { response: await response.json() };
};

export default Page;
