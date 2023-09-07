import React from 'react';
import { cn } from '@bem-react/classname';
import Text from '../Text';

import './Card.scss';

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
  const cnCard = cn('card');

  return (
    <div className={cnCard(null, [className])} onClick={onClick}>
      <img className={cnCard('image')} src={image} alt="" />
      <div className={cnCard('body')}>
        <div className={cnCard('content-slot')}>
          {captionSlot && (
            <Text view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text tag="h3" view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text view="p-16" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={cnCard('action-slot')}>
            <Text view="p-18" weight="bold">
              {contentSlot}
            </Text>
            <div className={cnCard('action')}>{actionSlot}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
