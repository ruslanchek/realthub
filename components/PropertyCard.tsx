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
				<div css={styles.price}>${property.price}</div>
				<div css={styles.title}>{property.title}</div>

				<footer css={styles.footer}>
					<div css={styles.address}>{property.address}</div>
					<div css={styles.params}>
						{property.params.map(param => (
							<span key={param.id}>
								{param.value} {param.type}
							</span>
						))}
					</div>
				</footer>
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
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	`,

	love: css`
		position: absolute;
		top: 10px;
		right: 10px;
	`,

	info: css`
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex-grow: 1;
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
		color: rgb(var(--TEXT_FADED));
	`,

	params: css`
		font-size: var(--FONT_SIZE_SMALL);
		font-weight: 500;
		margin-top: 1em;

		> span {
			margin-right: 1ex;
			background-color: rgba(var(--TEXT), 0.075);
			border-radius: 4px;
			padding: 3px 6px;
		}
	`,

	footer: css`
		justify-self: flex-end;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex-grow: 1;
	`,
};
