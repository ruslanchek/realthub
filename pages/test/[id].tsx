import { NextPage } from 'next';
import { PageWrapper } from '../../components/PageWrapper';
import { Header } from '../../components/Header';
import { PageHead } from '../../components/PageHead';
import { ApiProperty, IApiPropertyItem } from '../../apis/ApiProperty';
import { ErrorPage } from '../../components/ErrorPage';

interface IProps {
  property?: IApiPropertyItem;
}

const Page: NextPage<IProps> = ({ property }) => {
  if (!property) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <PageWrapper>
      <PageHead title={property.title} />
      <Header theme="inner" />
      <main>
        <div>
          {property.id} {property.title}
        </div>
      </main>
    </PageWrapper>
  );
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const result = await ApiProperty.getPropertyItem(id.toString(), ctx);
  return { property: result.data };
};

export default Page;
