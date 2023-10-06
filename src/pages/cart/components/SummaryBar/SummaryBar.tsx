import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import Text, {
  TextColor,
  TextView,
  TextWeight,
  TextTag,
} from '@components/Text';
import { useRootStore } from '@/store/RootStore/RootStoreProvider';
import { observer } from 'mobx-react-lite';

import styles from './SummaryBar.module.scss';

export type SummaryBarProps = {
  className?: string;
};

const SummaryBar: React.FC<SummaryBarProps> = ({ className }) => {
  const rootStore = useRootStore();
  const totalPrice = React.useMemo(
    () =>
      rootStore.cart.products.order.reduce((acc, id) => {
        const product = rootStore.cart.products.entities[id];
        if (!product) return acc;
        return acc + product.price * product.count * (1 - product.discount);
      }, 0),
    [rootStore.cart.products],
  );

  if (totalPrice === 0) return null;

  return (
    <>
      <div className={styles.summaryBarDivider} />
      <div className={cn(styles.summaryBar, className)}>
        <div className={styles.summaryBarTotal}>
          <Text
            tag={TextTag.H2}
            view={TextView.P20}
            weight={TextWeight.Bold}
            color={TextColor.Secondary}
          >
            Subtotal:
          </Text>
          <Text
            tag={TextTag.H2}
            view={TextView.Title}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            ${totalPrice.toFixed(2)}
          </Text>
        </div>
        <Link className={styles.summaryBarLink} to="/checkout">
          <Button>Checkout</Button>
        </Link>
      </div>
    </>
  );
};

export default observer(SummaryBar);
