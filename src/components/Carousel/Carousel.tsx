import React from 'react';
import BackIcon from '../icons/BackIcon';
import classnames from 'classnames';

import styles from './Carousel.module.scss';
import noImage from './images/no-image.png';

export type CarouselProps = {
  className?: string;
  images?: string[];
  interval?: number;
};

const Carousel: React.FC<CarouselProps> = ({ className, images }) => {
  const cnCarousel = classnames(styles.carousel, className);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchPosition, setTouchPosition] = React.useState<number | null>(null);

  const handleImageError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.src = noImage;
    },
    [],
  );

  const changeSlide = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (images && newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchDown = event.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = event.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  return (
    <div
      className={cnCarousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        className={styles.carouselSlider}
      >
        {images?.map((image, index) => (
          <img
            className={styles.carouselImage}
            src={image}
            alt="1"
            onError={handleImageError}
            key={index}
          />
        ))}
      </div>

      <div className={styles.carouselControls}>
        <BackIcon
          className={classnames(styles.carouselLeftControl, {
            [styles.carouselControlDisabled]: currentIndex === 0,
          })}
          height={`12%`}
          width={`12%`}
          onClick={() => changeSlide(-1)}
        />
        <BackIcon
          className={classnames(styles.carouselRightControl, {
            [styles.carouselControlDisabled]:
              currentIndex === (images?.length || 1) - 1,
          })}
          height={`12%`}
          width={`12%`}
          onClick={() => changeSlide(1)}
        />
      </div>
    </div>
  );
};

export default React.memo(Carousel);
