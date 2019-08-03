/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

export const Wrapper: React.FC = props => {
	return <main css={styles.root}>{props.children}</main>;
};

const styles = {
	root: css``,
};
