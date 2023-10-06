import * as React from 'react';
import cn from 'classnames';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.scss';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  const cnIcon = cn(
    props.className,
    props.color ? styles[`icon_fill_${props.color}`] : '',
  );

  return (
    <Icon className={cnIcon} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
