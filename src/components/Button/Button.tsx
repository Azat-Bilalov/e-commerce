import React from 'react';
import cn from 'classnames';
import Loader, { LoaderSize } from '../Loader';
import Text, { TextView, TextTag } from '../Text';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Полноцветная или обводная кнопка */
  outline?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  outline,
  disabled,
  children,
  onClick,
  ...otherProps
}) => {
  const cnButton = cn(
    styles.button,
    { [styles.buttonDisabled]: disabled, [styles.buttonOutline]: outline },
    [className],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    },
    [loading, onClick],
  );

  return (
    <button
      className={cnButton}
      onClick={handleClick}
      disabled={disabled || loading}
      {...otherProps}
    >
      {loading && (
        <Loader className={styles.buttonLoader} size={LoaderSize.Small} />
      )}
      <Text tag={TextTag.Span} view={TextView.Button}>
        {children}
      </Text>
    </button>
  );
};

export default React.memo(Button);
