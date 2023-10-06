import * as React from 'react';
import cn from 'classnames';
import Icon, { IconProps } from '../Icon';

import styles from '../Icon/Icon.module.scss';

const MinusIcon: React.FC<IconProps> = (props) => {
  const cnIcon = cn(
    props.className,
    props.color ? styles[`icon_stroke_${props.color}`] : '',
  );

  return (
    <Icon className={cnIcon} {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M6 12L18 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </Icon>
  );
};

export default MinusIcon;
