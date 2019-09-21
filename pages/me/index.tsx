/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/Head';

const Page: NextPage = () => {
  return (
    <Wrapper>
      <PageHead />
      <Header theme="inner" />
      <main css={styles.root}></main>
    </Wrapper>
  );
};

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,
};

export default Page;
