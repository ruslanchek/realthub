import { PageWrapper } from './PageWrapper';
import { PageHead } from './PageHead';
import { Header } from './Header';

export const Error404: React.FC = () => {
  return (
    <PageWrapper>
      <PageHead title="404" />
      <Header theme="inner" />
      <main>
        <div>404</div>
      </main>
    </PageWrapper>
  );
};
