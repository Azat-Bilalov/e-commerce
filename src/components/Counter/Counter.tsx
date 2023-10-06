import React from 'react';
import classnames from 'classnames';
import Button from '../Button';

import styles from './Counter.module.scss';
import Input from '../Input';
import PlusIcon from '../icons/PlusIcon';
import MinusIcon from '../icons/MinusIcon';

type CounterProps = {
  className?: string;
  range?: [number, number];
  count: number;
  onChange: (count: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  className,
  range,
  count,
  onChange,
}) => {
  const handleChange = React.useCallback((value: string) => {
    if (value === '') {
      onChange(0);
      return;
    }

    const parsedValue = +value;
    if (
      isNaN(parsedValue) ||
      (range && (parsedValue < range[0] || parsedValue > range[1]))
    ) {
      return;
    }

    onChange(parsedValue);
  }, []);

  const handleDecrement = React.useCallback(() => {
    if (range && count <= range[0]) return;
    onChange(count - 1);
  }, [count]);

  const handleIncrement = React.useCallback(() => {
    if (range && count >= range[1]) return;
    onChange(count + 1);
  }, [count]);

  return (
    <div className={classnames(className, styles.counter)}>
      <Button disabled={count === range?.[0]} onClick={handleDecrement}>
        <MinusIcon />
      </Button>
      <Input
        className={styles.counterInput}
        value={String(count)}
        onChange={handleChange}
      />
      <Button disabled={count === range?.[1]} onClick={handleIncrement}>
        <PlusIcon />
      </Button>
    </div>
  );
};

export default React.memo(Counter);
