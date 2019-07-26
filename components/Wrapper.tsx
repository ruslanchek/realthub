/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { GlobalStyles, themeLight } from 'eo-ui-kit';

export const Wrapper: React.FC = props => {
	return (
		<GlobalStyles theme={themeLight}>
			<main css={styles.root}>{props.children}</main>
		</GlobalStyles>
	);
};

const styles = {
	root: css`
		display: flex;
	`,
};
