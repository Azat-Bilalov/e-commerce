import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import CheckoutForm from './components/CheckoutForm';

import styles from './CheckoutPage.module.scss';
import rootStore from '@/store/RootStore/instance';
import React from 'react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const CheckoutPage: React.FC = () => {
  const totalPrice = React.useMemo(() => {
    return rootStore.cart.products.order
      .reduce((acc, id) => {
        const product = rootStore.cart.products.entities[id];

        return acc + product.price * (1 - product.discount) * product.count;
      }, 0)
      .toFixed(2);
  }, [rootStore.cart.products]);

  return (
    <div className={styles.checkoutPage}>
      <Text
        tag={TextTag.H1}
        view={TextView.Title}
        weight={TextWeight.Bold}
        color={TextColor.Primary}
      >
        Checkout
      </Text>
      {totalPrice !== '0.00' ? (
        <>
          <Text view={TextView.P18} color={TextColor.Accent}>
            Purchase of goods for a total amount of ${totalPrice}
          </Text>
          <CheckoutForm />
        </>
      ) : (
        <>
          <Text view={TextView.P18} color={TextColor.Accent}>
            Your cart is empty
          </Text>
          <Link to="/">
            <Button>Go to main page</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default observer(CheckoutPage);
