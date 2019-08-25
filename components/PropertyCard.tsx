/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { IProperty } from '../meta/interfaces';
import { Love } from './Love';

interface IProps {
	property: IProperty;
}

export const PropertyCard: React.FC<IProps> = props => {
	const { property } = props;
	const image = property.images[0];

	return (
		<div css={styles.root}>
			<Love enabled={false} styles={styles.love} />
			<img src={image.src} width={300} height={200} alt={image.title} />
			<div css={styles.info}>
				<div css={styles.price}>$1950</div>
				<div css={styles.title}>{property.title}</div>
				<div css={styles.address}>{property.address}</div>
				<div css={styles.params}>
					{property.params.map(param => (
						<span key={param.id}>{param.title}</span>
					))}
				</div>
			</div>
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

	love: css`
		position: absolute;
		top: 10px;
		right: 10px;
	`,

	info: css`
		padding: 10px 20px;
	`,

	price: css`
		font-weight: 700;
		color: rgb(var(--TEXT_ACTIVE));
	`,

	title: css`
		font-weight: 700;
		margin-top: 0.25em;
	`,

	address: css`
		font-size: var(--FONT_SIZE_SMALL);
		margin-top: 1em;
	`,

	params: css`
		font-size: var(--FONT_SIZE_SMALL);
		font-weight: 700;
		margin-top: 1em;

		> span {
			margin-right: 1ex;
			background-color: #eee;
			border-radius: 4px;
			padding: 3px 6px;
		}
	`,
};
