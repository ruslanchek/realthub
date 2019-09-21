import { NextPage } from 'next';
import { Wrapper } from '../../components/Wrapper';
import { Header } from '../../components/Header';
import fetch from 'isomorphic-unfetch';
import { IApiResponse, IProperty } from '../../common/interfaces';
import { PageHead } from '../../components/Head';

interface IProps {
  response: IApiResponse<IProperty>;
}

const Page: NextPage<IProps> = ({ response }) => (
  <Wrapper>
    <PageHead title={response.data && response.data.title} />
    <Header theme="inner" />
    <main>
      {response.data && (
        <div>
          {response.data.id} {response.data.title}
        </div>
      )}
    </main>
  </Wrapper>
);

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const response = await fetch(`${process.env.API_URL}/property/${id}`);
  return { response: await response.json() };
};

export default Page;
