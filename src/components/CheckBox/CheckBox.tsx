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
  const cnCheckboxIcon = cn(styles.icon, {
    [styles.iconDisabled]: disabled,
    [styles.iconChecked]: checked,
  });

  const handleCheckboxChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      onChange(isChecked);
    },
    [onChange],
  );

  return (
    <label styleName={cn(styles.checkbox)}>
      <input
        type="checkbox"
        styleName={styles.input}
        onChange={handleCheckboxChange}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      <span styleName={cnCheckboxIcon}>
        <CheckIcon width={40} height={40} />
      </span>
    </label>
  );
};

export default React.memo(CheckBox);
