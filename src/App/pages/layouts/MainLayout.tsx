import { Outlet } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import Text from '@components/Text';

import svgIcon from '@assets/svg/icon.svg';

import './index.scss';

const MainLayout = () => {
  const cnHeader = cn('header');

  return (
    <>
      <header className={cnHeader()}>
        <Link to="" className={cnHeader('brand')}>
          <img src={svgIcon} alt="" />
          <Text tag="h1" view="p-20" weight="medium" color="primary">
            Lalasia
          </Text>
        </Link>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
