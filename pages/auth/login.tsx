/** @jsx jsx */
import { jsx } from '@emotion/core';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { Login } from '../../components/Login';

interface IProps {}

const Page: NextPage<IProps> = () => {
  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />
      <main>
        <Login />
      </main>
    </PageWrapper>
  );
};

export default Page;
