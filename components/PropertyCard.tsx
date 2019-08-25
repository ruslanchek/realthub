/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { IProperty } from '../meta/interfaces';

interface IProps {
	property: IProperty;
}

export const PropertyCard: React.FC<IProps> = props => {
	const { property } = props;
	const image = property.images[0];

	return (
		<div css={styles.root}>
			<img src={image.src} width={300} height={200} alt={image.title} />
			<div css={styles.title}>{property.title}</div>
		</div>
	);
};

const styles = {
	root: css`
		background-color: white;
		width: 300px;
		height: 400px;
		border-radius: var(--BORDER_RADIUS_LARGE);
		position: relative;
		overflow: hidden;
		box-shadow: 0px 20px 25px rgba(175, 175, 175, 0.16),
			0px 10px 10px rgba(0, 0, 0, 0.04);
	`,

	title: css`
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 15px 20px;
	`,
};
