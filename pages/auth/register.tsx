/** @jsx jsx */
import { jsx } from '@emotion/core';
import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { Register } from '../../components/Register';

interface IProps {}

const Page: NextPage<IProps> = () => {
  return (
    <PageWrapper>
      <PageHead />
      <Header theme="inner" />
      <main>
        <Register />
      </main>
    </PageWrapper>
  );
};

export default Page;
