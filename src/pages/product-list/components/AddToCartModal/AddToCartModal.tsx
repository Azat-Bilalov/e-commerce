import React from 'react';
import Modal from '@/components/Modal';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@/components/Text';
import CartIcon from '@/components/icons/CartIcon';
import { ProductModel } from '@/store/models/products';
import Counter from '@/components/Counter';
import { useRootStore } from '@/store/RootStore/RootStoreProvider';
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { MAX_COUNT_IN_CART } from '@/configs/constants';

import styles from './AddToCartModal.module.scss';

export type AddToCartModalProps = {
  product: ProductModel | null;
  onClose: () => void;
};

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  product,
  onClose,
}) => {
  const navigate = useNavigate();
  const rootStore = useRootStore();
  const [count, setCount] = React.useState(1);

  const handleChange = React.useCallback((count: number) => {
    if (count < 1) return;
    setCount(count);
  }, []);

  const handleAddToCart = React.useCallback(() => {
    if (!product) return;
    rootStore.cart.insert(product, count);
    onClose();
  }, [product, onClose, count]);

  const handleCheckout = React.useCallback(() => {
    if (!product) return;
    rootStore.cart.insert(product, count);
    navigate('/cart');
    onClose();
  }, [product, onClose, count]);

  if (!product) return null;

  return (
    <Modal className={styles.modal} onClose={onClose}>
      <div className={styles.modalHeader}>
        <CartIcon height={80} width={80} color="accent" />
        <Text
          view={TextView.P20}
          weight={TextWeight.Medium}
          color={TextColor.Primary}
        >
          Add to Cart
        </Text>
      </div>
      <div className={styles.modalContent}>
        <Text
          tag={TextTag.P}
          view={TextView.P18}
          weight={TextWeight.Normal}
          color={TextColor.Accent}
        >
          Add as many {product?.title} items as you need!
        </Text>
        <Counter
          range={[1, MAX_COUNT_IN_CART]}
          count={count}
          onChange={handleChange}
        />
      </div>
      <div className={styles.modalFooter}>
        <Button onClick={handleCheckout} outline>
          Checkout
        </Button>
        <Button onClick={handleAddToCart}>Continue Shopping</Button>
      </div>
    </Modal>
  );
};

export default React.memo(AddToCartModal);
