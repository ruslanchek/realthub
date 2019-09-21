import { NextPage } from 'next';
import { Wrapper } from '../components/Wrapper';
import { Header } from '../components/Header';
import { PageHead } from '../components/Head';
import { Dropdown } from '../ui/module';

interface Props {
  userAgent: string | undefined;
}

const Page: NextPage<Props> = ({ userAgent }) => (
  <Wrapper>
    <PageHead />
    <Header theme="main" />
    <main>
      Your user agent: {userAgent}
      <br />
      <br />
      {process.env.GOOGLE_MAPS_API_KEY}
      <Dropdown
        items={[
          {
            value: '1',
            title: '1',
            data: '',
          },

          {
            value: '2222111',
            title: '2222111',
            data: '',
          },
        ]}
        value={'1'}
        name={'xxx'}
        onSelect={() => {}}
      />
    </main>
  </Wrapper>
);

Page.getInitialProps = async ctx => {
  const userAgent = ctx.req
    ? ctx.req.headers['user-agent']
    : navigator.userAgent;
  return { userAgent };
};

export default Page;
