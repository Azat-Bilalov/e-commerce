import * as React from 'react';
import cn from 'classnames';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.scss';

const CheckIcon: React.FC<IconProps> = (props) => {
  const cnIcon = cn(
    props.className,
    props.color ? styles[`icon_stroke_${props.color}`] : '',
  );

  return (
    <Icon className={cnIcon} {...props}>
      <path d="M4 11.6129L9.87755 18L20 7" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
