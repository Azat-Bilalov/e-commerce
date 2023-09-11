import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const BackIcon: React.FC<IconProps> = (props) => {
  const stroke = props.color ? `var(--text-${props.color})` : 'currentColor';

  return (
    <Icon viewBox="0 0 32 32" {...props}>
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default BackIcon;
