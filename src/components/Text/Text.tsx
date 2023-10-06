import * as React from 'react';
import cn from 'classnames';
import { TextTag, TextView, TextWeight, TextColor } from './config';
import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: TextView;
  /** Html-тег */
  tag?: TextTag;
  /** Начертание шрифта */
  weight?: TextWeight;
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: TextColor;
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = TextTag.P,
  weight,
  color,
  maxLines,
  children,
}: TextProps) => {
  const Tag = tag as keyof JSX.IntrinsicElements;

  const cnText = cn(
    styles.text,
    {
      [styles[`text_view_${view}`]]: view,
      [styles[`text_weight_${weight}`]]: weight,
      [styles[`text_color_${color}`]]: color,
      [styles['text_cuted']]: maxLines && maxLines > 0,
    },
    className,
  );

  const isCutText = maxLines && maxLines > 0;

  return (
    <Tag
      className={cnText}
      style={isCutText ? { WebkitLineClamp: maxLines } : {}}
    >
      {children}
    </Tag>
  );
};

export default React.memo(Text);
