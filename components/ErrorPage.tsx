import { PageWrapper } from './PageWrapper';
import { PageHead } from './PageHead';
import { Header } from './Header';

interface IProps {
  statusCode: number;
}

export const ErrorPage: React.FC<IProps> = props => {
  const { statusCode } = props;

  return (
    <PageWrapper>
      <PageHead title={statusCode.toString()} />
      <Header theme="inner" />
      <main>
        <div>{statusCode.toString()}</div>
      </main>
    </PageWrapper>
  );
};
