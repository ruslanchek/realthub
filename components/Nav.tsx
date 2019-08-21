/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Link from 'next/link';
import { PATHS } from '../common/constants';

export const Nav: React.FC = () => {
	return (
		<nav css={styles.root}>
			<p>
				<Link href={PATHS.HOME}>
					<a href={PATHS.HOME} css={styles.logo}>
						Home
					</a>
				</Link>
			</p>

			<p>
				<Link href={`/test`} as={`/test`} prefetch>
					<a>Test</a>
				</Link>
			</p>
		</nav>
	);
};

const styles = {
	root: css``,

	logo: css``,
};
