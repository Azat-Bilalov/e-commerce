import React from 'react';
import { cn } from '@bem-react/classname';

import './Loader.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  const classes = cn('loader')({ size }, [className]);

  return <div className={classes}></div>;
};

export default Loader;
