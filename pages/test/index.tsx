/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';
import { PropertyCard } from '../../components/PropertyCard';

interface IProps {
	response: IApiResponse<IProperty[]>;
}

const Page: NextPage<IProps> = ({ response }) => (
	<Wrapper>
		<PageHead />
		<Header />
		<main css={styles.items}>
			{response.data &&
				response.data.map(item => (
					<div key={item.id} css={styles.item}>
						<Link href={`/test/[id]`} as={`/test/${item.id}`}>
							<PropertyCard property={item} />
						</Link>
					</div>
				))}
		</main>
	</Wrapper>
);

Page.getInitialProps = async () => {
	const response = await fetch(`${process.env.API_URL}/property`);
	return { response: await response.json() };
};

const styles = {
	items: css`
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	`,

	item: css`
		padding: 20px;
	`,
};

export default Page;
