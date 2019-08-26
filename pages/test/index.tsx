/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';
import { PropertyCard } from '../../components/PropertyCard';
import { CustomScrollbars } from 'eo-ui-kit';

interface IProps {
	response: IApiResponse<IProperty[]>;
}

const Page: NextPage<IProps> = ({ response }) => (
	<Wrapper>
		<PageHead />
		<Header />

		<main css={styles.items}>
			<CustomScrollbars>
				<div css={styles.itemsContainer}>
					{response.data &&
						response.data.map(item => <PropertyCard property={item} />)}
				</div>
			</CustomScrollbars>
		</main>
	</Wrapper>
);

Page.getInitialProps = async () => {
	const response = await fetch(`${process.env.API_URL}/property`);
	return { response: await response.json() };
};

const styles = {
	items: css`
		width: 100%;
		overflow: auto;
	`,

	itemsContainer: css`
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	`,

	item: css`
		padding: 45px 20px;
	`,
};

export default Page;
