import React from 'react';
import cn from 'classnames';
import Text, { TextColor, TextTag, TextView, TextWeight } from '../Text';

import styles from './Card.module.scss';
import noImage from './images/no-image.png';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const cnCard = cn(styles.card, className);

  const handleImageError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = noImage;
    },
    [],
  );

  const handleActionClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  return (
    <div className={cnCard} onClick={onClick}>
      <img
        className={styles.cardImage}
        src={image}
        alt="1"
        onError={handleImageError}
      />
      <div className={styles.cardBody}>
        <div className={styles.cardContentSlot}>
          <Text
            view={TextView.P14}
            weight={TextWeight.Medium}
            color={TextColor.Secondary}
          >
            {captionSlot}
          </Text>
          <Text
            tag={TextTag.H3}
            view={TextView.P20}
            weight={TextWeight.Medium}
            maxLines={2}
          >
            {title}
          </Text>
          <Text view={TextView.P16} color={TextColor.Secondary} maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={styles.cardActionSlot}>
            <Text view={TextView.P18} weight={TextWeight.Bold}>
              {contentSlot}
            </Text>
            <div onClick={handleActionClick}>{actionSlot}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Card);
