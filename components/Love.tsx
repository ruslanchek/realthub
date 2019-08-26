/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core';
import React from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

interface IProps {
	enabled: boolean;
	styles?: SerializedStyles;
	onChange?: (value: boolean) => void;
}

export const Love = React.memo<IProps>(props => {
	return (
		<div
			css={[styles.love, props.styles]}
			onClick={() => {
				if (props.onChange) {
					props.onChange(!props.enabled);
				}
			}}
		>
			{props.enabled ? (
				<IoMdHeart size="22px" color={'rgb(var(--TEXT_ACTIVE))'} />
			) : (
				<IoMdHeartEmpty size="22px" color={'rgb(var(--TEXT_ACTIVE))'} />
			)}
		</div>
	);
});

const styles = {
	love: css`
		background-color: #fff;
		box-sizing: border-box;
		width: 34px;
		height: 34px;
		line-height: 47px;
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
		opacity: 0.75;

		&:hover {
			opacity: 1;
		}
	`,
};
