import { NextPage } from 'next';
import { Wrapper } from '../components/Wrapper';
import { Nav } from '../components/Nav';
import { PageHead } from '../components/Head';

interface Props {
	userAgent: string | undefined;
}

const Page: NextPage<Props> = ({ userAgent }) => (
	<Wrapper>
		<PageHead title="sss" description="xxx" />
		<Nav />
		<main>
			Your user agent: {userAgent}
			<br />
			<br />
			{process.env.GOOGLE_MAPS_API_KEY}
		</main>
	</Wrapper>
);

Page.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
	return { userAgent };
};

export default Page;
