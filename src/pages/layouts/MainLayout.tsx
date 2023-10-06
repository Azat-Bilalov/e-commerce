import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Text, {
  TextTag,
  TextView,
  TextWeight,
  TextColor,
} from '@components/Text';
import { useQueryParamsStoreInit } from '@/store/RootStore/QueryStore/useQueryParamsStoreInit';

import svgIcon from '@assets/svg/icon.svg';
import styles from './MainLayout.module.scss';
import CartIcon from '@/components/icons/CartIcon';

const navItems = [
  { name: 'Product', path: '/' },
  { name: 'Categories', path: '/categories' },
  { name: 'About us', path: '/about' },
];

const MainLayout = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <header id="header" className={styles.header}>
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
        <nav className={styles.headerNav}>
          {navItems.map((navItem) => (
            <NavLink
              key={navItem.path}
              to={navItem.path}
              className={({ isActive }) =>
                cn(
                  styles.headerNavLink,
                  isActive ? styles.headerNavLinkActive : '',
                )
              }
            >
              <Text tag={TextTag.Span} view={TextView.P18}>
                {navItem.name}
              </Text>
            </NavLink>
          ))}
        </nav>
        <Link to="/cart" className={styles.headerCart}>
          <CartIcon />
        </Link>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
