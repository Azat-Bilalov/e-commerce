import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import Counter from '@/components/Counter';
import { MAX_COUNT_IN_CART } from '@/configs/constants';
import CloseIcon from '@/components/icons/CloseIcon';
import { ProductCartModel } from '@/store/RootStore/CartStore';

import styles from './CartProduct.module.scss';

export type CartProductProps = {
  product: ProductCartModel;
  handleChangeCount: (product: ProductCartModel, count: number) => void;
  handleRemove: (product: ProductCartModel) => void;
};

const CartProduct: React.FC<CartProductProps> = ({
  product,
  handleChangeCount,
  handleRemove,
}) => {
  const navigate = useNavigate();

  const navToItem = React.useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [product]);

  const handleCounterChange = React.useCallback(
    (count: number) => {
      if (count === 0) {
        handleRemove(product);
        return;
      }
      handleChangeCount(product, count);
    },
    [product, handleChangeCount],
  );

  const handleRemoveClick = React.useCallback(() => {
    handleRemove(product);
  }, [product, handleRemove]);

  return (
    <div className={styles.cartProduct}>
      <img
        className={styles.cartProductImage}
        src={product.images[0]}
        alt={product.title}
        onClick={navToItem}
      />
      <div onClick={navToItem} className={styles.cartProductContent}>
        <Text
          tag={TextTag.H2}
          view={TextView.P20}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          {product.title}
        </Text>
        <Text
          tag={TextTag.H4}
          view={TextView.P16}
          weight={TextWeight.Medium}
          color={TextColor.Secondary}
        >
          {product.category.name}
        </Text>
      </div>
      {product.discount !== 0 ? (
        <Text
          tag={TextTag.H2}
          view={TextView.P20}
          weight={TextWeight.Bold}
          className={styles.cartProductPrice}
        >
          <Text
            className={styles.cartProductPrice}
            tag={TextTag.Span}
            color={TextColor.Secondary}
          >
            <s>${product.price}</s>
          </Text>
          <Text
            className={styles.cartProductPrice}
            tag={TextTag.Span}
            color={TextColor.Primary}
          >
            ${(product.price * (1 - product.discount)).toFixed(2)}
          </Text>
        </Text>
      ) : (
        <Text
          className={styles.cartProductPrice}
          tag={TextTag.H2}
          view={TextView.P20}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          ${product.price}
        </Text>
      )}
      <Counter
        className={styles.cartProductCounter}
        range={[0, MAX_COUNT_IN_CART]}
        count={product.count}
        onChange={handleCounterChange}
      />
      <div className={styles.cartProductRemove}>
        <CloseIcon
          height={32}
          width={32}
          color="accent"
          onClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};

export default CartProduct;
