import * as React from 'react';
import { cn } from '@bem-react/classname';

import './Text.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  color,
  maxLines,
  children,
}: TextProps) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const classes = cn('text')({ view, weight, color, 'cut-text': !!maxLines }, [
    className,
  ]);

  const isCutText = maxLines && maxLines > 0;

  return (
    <Tag
      className={classes}
      style={isCutText ? { WebkitLineClamp: maxLines } : {}}
    >
      {children}
    </Tag>
  );
};

export default Text;
