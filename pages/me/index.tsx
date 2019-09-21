/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/Head';
import { getMe } from '../../managers/authApi';

interface IProps {
  response: any;
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

Page.getInitialProps = async context => {
  const me = await getMe(context);

  console.log(me);

  return { response: null };
};

const styles = {
  root: css`
    flex-grow: 1;
    display: flex;
  `,
};

export default Page;
