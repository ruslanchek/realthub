/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';

interface IProps {}

const Page: NextPage<IProps> = () => {
  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />
      <main css={styles.root}>Login</main>
    </PageWrapper>
  );
};

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,
};

export default Page;
