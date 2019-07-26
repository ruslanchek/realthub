/** @jsx jsx */
import { jsx, css } from '@emotion/core';
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
			Your user agent: <span css={styles.test}>{userAgent}</span>{' '}
			{process.env.customKey} 934
		</main>
	</Wrapper>
);

Page.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
	return { userAgent };
};

export default Page;

const styles = {
	test: css``,
};
