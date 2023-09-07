import React from 'react';
import { cn } from '@bem-react/classname';
import Loader from '../Loader';
import Text from '../Text';

import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  disabled,
  children,
  onClick,
  ...otherProps
}) => {
  const cnButton = cn('button');
  const classes = cnButton({ loading, disabled }, [className]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled || loading}
      {...otherProps}
    >
      {loading && <Loader className={cnButton('loader')} size="s" />}
      <Text view="button">{children}</Text>
    </button>
  );
};

export default Button;
