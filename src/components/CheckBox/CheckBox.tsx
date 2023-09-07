import React from 'react';
import { cn } from '@bem-react/classname';
import CheckIcon from '../icons/CheckIcon';

import './CheckBox.scss';

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
  const cnCheckbox = cn('checkbox');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    onChange(isChecked);
  };

  return (
    <label className={cnCheckbox('label')}>
      <input
        type="checkbox"
        className={cnCheckbox('input')}
        onChange={handleCheckboxChange}
        disabled={disabled}
        checked={checked}
        {...props}
      />
      <span className={cnCheckbox('icon', { disabled, checked })}>
        <CheckIcon width={40} height={40} />
      </span>
    </label>
  );
};

export default CheckBox;
