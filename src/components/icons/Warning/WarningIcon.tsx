import * as React from 'react';
import cn from 'classnames';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.scss';

const WarningIcon: React.FC<IconProps> = (props) => {
  const cnIcon = cn(
    props.className,
    props.color ? styles[`icon_stroke_${props.color}`] : '',
  );

  return (
    <Icon className={cnIcon} {...props}>
      <path
        d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </Icon>
  );
};

export default WarningIcon;
