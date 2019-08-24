/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { GlobalStyles, themeLight } from 'eo-ui-kit';

export const Wrapper: React.FC = props => {
	return (
		<main css={styles.root}>
			<Global styles={styles.global} />
			<GlobalStyles theme={themeLight} />
			{props.children}
		</main>
	);
};

const styles = {
	root: css``,

	global: css``,
};
