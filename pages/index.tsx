/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';

interface Props {
	userAgent: string | undefined;
}

const Page: NextPage<Props> = ({ userAgent }) => (
	<main>
		Your user agent: <span css={styles.test}>{userAgent}</span>{' '}
		{process.env.customKey}
	</main>
);

Page.getInitialProps = async ({ req }) => {
	const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
	return { userAgent };
};

export default Page;

const styles = {
	test: css`
		background: red;
	`,
};
