import { NextPage } from 'next';
import { Wrapper } from '../components/Wrapper';
import { Header } from '../components/Header';
import { PageHead } from '../components/Head';

interface Props {
	userAgent: string | undefined;
}

const Page: NextPage<Props> = ({ userAgent }) => (
	<Wrapper>
		<PageHead />
		<Header />
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
