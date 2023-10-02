import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@components/Text';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button/Button';
import BackButton from './components/BackButton/BackButton';
import ProductStore from '@/store/ProductStore';
import { useLocalStore } from '@/utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { Meta } from '@/utils/meta';

import styles from './ProductPage.module.scss';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const store = useLocalStore(() => new ProductStore(id!));

  const { product, meta } = store;

  React.useEffect(() => {
    if (meta === Meta.Error) {
      navigate('/404/');
    }
  }, [meta]);

  return (
    <>
      <BackButton className={styles.backButton} />
      <div className={styles.product}>
        <Carousel className={styles.productCarousel} images={product?.images} />
        <div className={styles.productContent}>
          <Text tag={TextTag.H1} view={TextView.Title}>
            {product?.title}
          </Text>
          <Text
            tag={TextTag.H2}
            view={TextView.P20}
            color={TextColor.Accent}
            weight={TextWeight.Bold}
          >
            {product?.category.name}
          </Text>
          <Text view={TextView.P20} color={TextColor.Secondary}>
            {product?.description}
          </Text>
          <div className={styles.productActions}>
            <Text tag={TextTag.H2} view={TextView.Title}>
              ${product?.price}
            </Text>
            <div className={styles.productButtons}>
              <Button>Buy now</Button>
              <Button outline>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(ProductPage);
