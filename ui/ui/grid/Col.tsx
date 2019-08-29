/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';

interface IProps {
	verticalAlign?: 'top' | 'middle' | 'bottom';
}

export const Col: React.FC<IProps> = props => {
	let justifyContent = '';

	switch (props.verticalAlign) {
		case 'top': {
			justifyContent = 'flex-start';
			break;
		}
		case 'middle': {
			justifyContent = 'center';
			break;
		}
		case 'bottom': {
			justifyContent = 'flex-end';
			break;
		}

		default: {
			justifyContent = 'flex-start';
		}
	}

	return (
		<div
			css={[
				styles.root,
				css`
					justify-content: ${justifyContent};
				`,
			]}
		>
			{props.children}
		</div>
	);
};

const styles = {
	root: css`
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex-grow: 0;
		flex-shrink: 1;
	`,
};
