import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import CartProduct from '../CartProduct';
import DeleteConfirmModal from '../DeleteConfirmModal';
import Text, { TextColor, TextView, TextWeight } from '@components/Text';
import Button from '@/components/Button';
import { useRootStore } from '@/store/RootStore/RootStoreProvider';
import { ProductCartModel } from '@/store/RootStore/CartStore';

import styles from './CartProductList.module.scss';
import SummaryBar from '../SummaryBar';

const CartProductList: React.FC = () => {
  const rootStore = useRootStore();
  const products = React.useMemo(
    () => rootStore.cart.products,
    [rootStore.cart.products],
  );

  const [productToDelete, setProductToDelete] =
    React.useState<ProductCartModel | null>(null);

  /** Изменение количества товара в корзине */
  const handleChangeCount = React.useCallback(
    (product: ProductCartModel, count: number) => {
      rootStore.cart.insert(product, count);
    },
    [products],
  );

  /** Удаление товара из корзины */
  const handleRemove = React.useCallback(
    (product: ProductCartModel) => {
      rootStore.cart.remove(product.id);
      setProductToDelete(null);
    },
    [products],
  );

  /** Открытие модалки подтверждения удаления */
  const handleOpenModal = React.useCallback(
    (product: ProductCartModel) => {
      setProductToDelete(product);
    },
    [products],
  );

  /** Закрытие модалки подтверждения удаления */
  const handleCloseModal = React.useCallback(() => {
    setProductToDelete(null);
  }, []);

  return (
    <div className={styles.cartProductList}>
      <DeleteConfirmModal
        product={productToDelete}
        onClose={handleCloseModal}
        handleConfirm={handleRemove}
      />
      {products.order.map((id) => (
        <CartProduct
          key={id}
          product={products.entities[id]}
          handleChangeCount={handleChangeCount}
          handleRemove={handleOpenModal}
        />
      ))}
      {products.order.length === 0 && (
        <div className={styles.cartProductListEmpty}>
          <Text
            view={TextView.Title}
            weight={TextWeight.Medium}
            color={TextColor.Accent}
          >
            Cart is empty
          </Text>
          <Text
            view={TextView.P20}
            weight={TextWeight.Normal}
            color={TextColor.Secondary}
          >
            But you can make it full!
          </Text>
          <Link to="/">
            <Button outline>Back to shopping</Button>
          </Link>
        </div>
      )}
      <SummaryBar className={styles.cartProductListSummary} />
    </div>
  );
};

export default observer(CartProductList);
