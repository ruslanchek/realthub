/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import React from 'react';
import { GlobalStyles, themeLight, ITheme } from 'eo-ui-kit';

const theme: ITheme = {
	CONSTANTS: {
		...themeLight.CONSTANTS,
		FONT_SIZE_BASE: '17px',
		FONT_SIZE_MEDIUM: '19px',
		FONT_SIZE_LARGE: '25px',
		FONT_SIZE_SMALL: '14px',
	},

	COLORS: {
		...themeLight.COLORS,
	},
};

export const Wrapper: React.FC = props => {
	return (
		<main css={styles.root}>
			<Global styles={styles.global} />
			<GlobalStyles theme={theme} />
			{props.children}
		</main>
	);
};

const styles = {
	root: css``,

	global: css``,
};
