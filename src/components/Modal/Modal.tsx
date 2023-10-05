import React from 'react';
import classnames from 'classnames';
import CloseIcon from '../icons/CloseIcon';

import styles from './Modal.module.scss';

export type ModalProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, className, onClose }) => {
  const handleClickOutside = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  }, []);

  return (
    <div className={styles.modal} onClick={handleClickOutside}>
      <div className={styles.modalContent}>
        <div className={styles.modalClose} onClick={onClose}>
          <CloseIcon width={30} height={30} color="secondary" />
        </div>
        <div className={classnames(className, styles.modalBody)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
