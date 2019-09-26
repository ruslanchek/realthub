/** @jsx jsx */
import { jsx } from '@emotion/core';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { ApiAuth } from '../../apis/ApiAuth';

const Page: NextPage = () => {
  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />
      <main></main>
    </PageWrapper>
  );
};

export default Page;

Page.getInitialProps = async ctx => {
  const result = await ApiAuth.getMe(ctx);

  if (!result.data && result.error) {
    ApiAuth.redirectToAuth(ctx);
  }

  return result;
};
