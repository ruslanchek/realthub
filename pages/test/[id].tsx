import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Nav } from '../../components/Nav';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';

interface IProps {
	response: IApiResponse<IProperty>;
}

const Page: NextPage<IProps> = ({ response }) => (
	<Wrapper>
		<PageHead title={response.data && response.data.title} />
		<Nav />
		<main>
			{response.data && (
				<div>
					{response.data.id} {response.data.title}
				</div>
			)}
		</main>
	</Wrapper>
);

Page.getInitialProps = async context => {
	const { id } = context.query;
	const response = await fetch(`${process.env.API_URL}/property/${id}`);
	return { response: await response.json() };
};

export default Page;
