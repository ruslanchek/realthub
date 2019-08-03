/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { PATHS } from '../common/constants';

export const Nav: React.FC = () => {
	return (
		<nav css={styles.root}>
			<Link href={PATHS.HOME}>
				<a href={PATHS.HOME} css={styles.logo}>
					Realthub
				</a>
			</Link>
		</nav>
	);
};

const styles = {
	root: css`
		height: 100vh;
		width: 70px;
		max-width: 70px;
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		background-color: #d4e2f5;
		box-sizing: border-box;
	`,

	logo: css`
		background-image: url('/static/logo-color.png');
		background-size: 40px;
		background-repeat: no-repeat;
		background-position: 50%;
		background-color: rgba(255, 255, 255, 0.3);
		text-indent: -200px;
		width: 70px;
		height: 70px;
		display: block;
		position: relative;
	`,
};
