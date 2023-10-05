import React from 'react';
import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { ProductCartModel } from '@/store/RootStore/CartStore';

import styles from './DeleteConfirmModal.module.scss';
import Warning from '@/components/icons/Warning';

export type DeleteConfirmModalProps = {
  product: ProductCartModel | null;
  onClose: () => void;
  handleConfirm: (product: ProductCartModel) => void;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  onClose,
  handleConfirm,
}) => {
  if (!product) return null;

  const handleConfirmClick = React.useCallback(() => {
    handleConfirm(product);
  }, [product, handleConfirm]);

  return (
    <Modal className={styles.modal} onClose={onClose}>
      <div className={styles.modalHeader}>
        <Warning height={80} width={80} color="accent" />
        <Text
          tag={TextTag.H2}
          view={TextView.P20}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          Delete Item from Cart
        </Text>
      </div>
      <div className={styles.modalContent}>
        <Text
          tag={TextTag.P}
          view={TextView.P16}
          weight={TextWeight.Medium}
          color={TextColor.Primary}
        >
          Are you sure you want to delete this item?
        </Text>
      </div>
      <div className={styles.modalFooter}>
        <Button onClick={onClose} outline>
          Cancel
        </Button>
        <Button onClick={handleConfirmClick}>Delete</Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
