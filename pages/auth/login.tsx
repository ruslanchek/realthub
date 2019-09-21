/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
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
      <main css={styles.root}>Login</main>
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
