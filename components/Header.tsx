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
					<a>Loved properties</a>
				</Link>

				<Link href={`/test`} as={`/test`}>
					<a>Moving center</a>
				</Link>

				<Link href={`/test`} as={`/test`}>
					<a>List a Property</a>
				</Link>

				<Link href={`/test`} as={`/test`}>
					<a>Blog</a>
				</Link>
			</nav>
		</header>
	);
};

const styles = {
	root: css`
		padding: 40px;
		display: flex;
		align-items: center;
	`,

	logo: css`
		text-indent: -10000px;
		background-image: url('/static/assets/logo.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 190px;
		height: 35px;
		display: block;
		margin-right: 40px;
		top: -6px;
		position: relative;
	`,

	nav: css`
		display: flex;
		align-items: center;

		> a {
			margin-right: 30px;
		}
	`,
};
