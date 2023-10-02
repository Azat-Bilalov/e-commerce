import React from 'react';
import ContentLoader from 'react-content-loader';

export type CardLoaderProps = {
  className?: string;
  speed?: number;
};

export const CardLoader: React.FC<CardLoaderProps> = ({
  className,
  speed = 1,
}) => (
  <ContentLoader
    speed={speed}
    width={'100%'}
    height={606}
    viewBox="0 0 360 606"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className={className}
  >
    <rect x="0" y="0" rx="2" ry="2" width="360" height="360" />
    <rect x="12" y="430" rx="0" ry="0" width="180" height="20" />
    <rect x="12" y="458" rx="0" ry="0" width="336" height="16" />
    <rect x="12" y="482" rx="0" ry="0" width="336" height="16" />
    <rect x="12" y="506" rx="0" ry="0" width="336" height="16" />
    <rect x="12" y="569" rx="0" ry="0" width="70" height="18" />
    <rect x="12" y="408" rx="0" ry="0" width="80" height="14" />
    <rect x="193" y="554" rx="0" ry="0" width="155" height="52" />
  </ContentLoader>
);
