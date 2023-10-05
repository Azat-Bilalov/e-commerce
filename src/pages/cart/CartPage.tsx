import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import CartProductList from './components/CartProductList';

import styles from './CartPage.module.scss';

const CartPage: React.FC = () => {
  return (
    <>
      <div className={styles.cartProducts}>
        <Text
          tag={TextTag.H1}
          view={TextView.Title}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          Shopping cart
        </Text>
        <CartProductList />
      </div>
    </>
  );
};

export default CartPage;
