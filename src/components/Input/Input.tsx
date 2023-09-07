import React from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    onChange,
    onFocus,
    onBlur,
    afterSlot,
    className,
    type = 'text',
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const cnInput = cn('input');
  const classes = cnInput({ focused: isFocused }, [className]);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  return (
    <div className={classes} onClick={() => inputRef.current?.focus()}>
      <input
        className={cnInput('control')}
        value={value}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        {...otherProps}
      />
      {afterSlot}
    </div>
  );
});

export default Input;
