import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Text, {
  TextTag,
  TextView,
  TextWeight,
  TextColor,
} from '@components/Text';

import svgIcon from '@assets/svg/icon.svg';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.headerBrand}>
          <img src={svgIcon} alt="" />
          <Text
            tag={TextTag.H1}
            view={TextView.P20}
            weight={TextWeight.Medium}
            color={TextColor.Primary}
          >
            Lalasia
          </Text>
        </Link>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
