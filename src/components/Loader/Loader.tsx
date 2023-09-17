import React from 'react';
import cn from 'classnames';

import styles from './Loader.module.scss';

export enum LoaderSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export type LoaderProps = {
  /** Размер */
  size?: LoaderSize;
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = LoaderSize.Large,
  className,
}) => {
  const cnLoader = cn(
    styles.loader,
    {
      [styles.loaderSizeS]: size === LoaderSize.Small,
      [styles.loaderSizeM]: size === LoaderSize.Medium,
      [styles.loaderSizeL]: size === LoaderSize.Large,
    },
    className,
  );

  return <div className={cnLoader}></div>;
};

export default React.memo(Loader);
