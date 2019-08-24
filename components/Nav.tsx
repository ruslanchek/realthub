/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { PATHS } from '../common/constants';

export const Header: React.FC = () => {
	return (
		<header css={styles.root}>
			<Link href={PATHS.HOME}>
				<a href={PATHS.HOME} css={styles.logo}>
					Realthub
				</a>
			</Link>

			<nav css={styles.nav}>
				<Link href={`/test`} as={`/test`}>
					<a>Test</a>
				</Link>
			</nav>
		</header>
	);
};

const styles = {
	root: css`
		padding: 40px;
		display: flex;
	`,

	logo: css`
		text-indent: -10000px;
		background-image: url('/static/assets/logo.png');
		background-size: contain;
		width: 48px;
		height: 48px;
		display: block;
	`,

	nav: css`
		display: flex;
	`,
};
