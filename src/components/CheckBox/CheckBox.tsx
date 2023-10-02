import React from 'react';
import cn from 'classnames';
import CheckIcon from '../icons/CheckIcon';

import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  disabled,
  checked,
  ...props
}) => {
  const cnCheckboxIcon = cn(styles.checkboxIcon, {
    [styles.checkboxIconDisabled]: disabled,
    [styles.checkboxIconChecked]: checked,
  });

  const handleCheckboxChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      onChange(isChecked);
    },
    [onChange],
  );

  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        onChange={handleCheckboxChange}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      <span className={cnCheckboxIcon}>
        <CheckIcon width={40} height={40} />
      </span>
    </label>
  );
};

export default React.memo(CheckBox);
