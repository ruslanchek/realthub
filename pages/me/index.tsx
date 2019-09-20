/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../meta/interfaces';
import { PageHead } from '../../components/Head';

interface IProps {
  response: IApiResponse<IProperty[]>;
}

const Page: NextPage<IProps> = () => {
  return (
    <Wrapper>
      <PageHead />
      <Header theme="inner" />

      <main css={styles.root}></main>
    </Wrapper>
  );
};

Page.getInitialProps = async () => {
  const response = await fetch(`${process.env.API_URL}/property`);
  return { response: await response.json() };
};

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,
};

export default Page;
