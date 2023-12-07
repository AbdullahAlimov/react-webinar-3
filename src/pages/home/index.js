import { memo} from 'react';
import PageLayout from "../../components/page-layout";
import Main from './main';
import HomePagination from './home-pagination';

function Home() {
  return (
    <PageLayout>
      <Main></Main>
      <HomePagination></HomePagination>
    </PageLayout>

  );
}

export default memo(Home);
