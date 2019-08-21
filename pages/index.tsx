import { NextPage } from 'next';
import { Wrapper } from '../components/Wrapper';
import { Nav } from '../components/Nav';

interface Props {
	userAgent: string | undefined;
}

const Page: NextPage<Props> = ({ userAgent }) => (
	<Wrapper>
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
