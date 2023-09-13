import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  const stroke = props.color ? `var(--text-${props.color})` : 'currentColor';

  return (
    <Icon {...props}>
      <path d="M4 11.6129L9.87755 18L20 7" stroke={stroke} strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
