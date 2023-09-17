import React from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

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

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const cnInput = cn(
    styles.input,
    { [styles.inputFocused]: isFocused },
    className,
  );

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current!);

  return (
    <div className={cnInput} onClick={() => inputRef.current?.focus()}>
      <input
        className={styles.inputField}
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
