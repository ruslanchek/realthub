/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { ApiProperty, IApiPropertyItem } from '../../apis/ApiProperty';

interface IProps {
  properties: IApiPropertyItem[];
}

const Page: NextPage<IProps> = ({ properties }) => (
  <PageWrapper>
    <PageHead />
    <Header theme="inner" />
    <main css={styles.items}>
      <div css={styles.itemsContainer}></div>
    </main>
  </PageWrapper>
);

Page.getInitialProps = async ctx => {
  const result = await ApiProperty.getPropertyList(ctx);
  return { properties: result.data || [] };
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
