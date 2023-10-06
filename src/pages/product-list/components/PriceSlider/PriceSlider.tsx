import React from 'react';
import classnames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Slider from 'rc-slider';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useProductListStore } from '@/store/ProductListStore';

import 'rc-slider/assets/index.css';
import styles from './PriceSlider.module.scss';

export type PriceSliderProps = {
  className?: string;
};

const PriceSlider: React.FC<PriceSliderProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** Получение максимальной и минимальной цены из запроса */
  const { minPrice, maxPrice } = useProductListStore();

  /** Хранение текущих значений слайдера */
  const [minPriceValue, setMinPriceValue] = React.useState(0);
  const [maxPriceValue, setMaxPriceValue] = React.useState(0);

  /** Значения по умолчанию */
  React.useEffect(() => {
    searchParams.has('min_price')
      ? setMinPriceValue(+searchParams.get('min_price')!)
      : setMinPriceValue(minPrice);

    searchParams.has('max_price')
      ? setMaxPriceValue(+searchParams.get('max_price')!)
      : setMaxPriceValue(maxPrice);
  }, [minPrice, maxPrice, searchParams]);

  /** Обновление параметров запроса */
  React.useEffect(() => {
    const debounced = setTimeout(() => {
      minPriceValue === minPrice
        ? searchParams.delete('min_price')
        : searchParams.set('min_price', String(minPriceValue));
      maxPriceValue === maxPrice
        ? searchParams.delete('max_price')
        : searchParams.set('max_price', String(maxPriceValue));
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(debounced);
  }, [minPriceValue, maxPriceValue]);

  /** Обработчики изменения значений */
  const handleMinPriceChange = React.useCallback(
    (value: string) => {
      if (value === '' || Number(value) < minPrice) {
        setMinPriceValue(minPrice);
        return;
      }
      if (!Number(value) || Number(value) > maxPriceValue) {
        return;
      }
      setMinPriceValue(Number(value));
    },
    [minPriceValue, maxPriceValue],
  );

  const handleMaxPriceChange = React.useCallback(
    (value: string) => {
      if (Number(value) > maxPrice) {
        setMaxPriceValue(maxPrice);
        return;
      }
      if (!Number(value) || Number(value) < minPriceValue) {
        return;
      }
      setMaxPriceValue(Number(value));
    },
    [minPriceValue, maxPriceValue],
  );

  return (
    <div className={classnames(styles.priceSlider, className)}>
      <Slider
        className={styles.priceSliderControl}
        min={minPrice}
        max={maxPrice}
        pushable={(maxPrice - minPrice) / 20}
        value={[minPriceValue, maxPriceValue]}
        range
        onChange={(minMax) => {
          minMax = minMax as [number, number];
          setMinPriceValue(minMax[0]);
          setMaxPriceValue(minMax[1]);
        }}
      />
      <Input
        className={styles.priceSliderMin}
        placeholder={`Min: ${minPrice}`}
        type="number"
        value={minPrice === minPriceValue ? '' : String(minPriceValue)}
        onChange={handleMinPriceChange}
      />
      <Input
        className={styles.priceSliderMax}
        placeholder={`Max: ${maxPrice}`}
        type="number"
        value={maxPrice === maxPriceValue ? '' : String(maxPriceValue)}
        onChange={handleMaxPriceChange}
      />
    </div>
  );
};

export default observer(PriceSlider);
