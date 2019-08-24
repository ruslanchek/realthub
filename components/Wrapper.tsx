/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { GlobalStyles, themeLight } from 'eo-ui-kit';

export const Wrapper: React.FC = props => {
	return (
		<main css={styles.root}>
			<GlobalStyles theme={themeLight} />
			{props.children}
		</main>
	);
};

const styles = {
	root: css``,
};
