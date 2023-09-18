import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@components/Text';
import Button from '@/components/Button/Button';
import BackIcon from '@/components/icons/BackIcon';
import ProductStore from '@/store/ProductStore';
import { useLocalStore } from '@/utils/useLocalStore';
import { observer } from 'mobx-react-lite';

import styles from './ProductPage.module.scss';
import { Meta } from '@/utils/meta';
import _ from 'lodash';

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const store = useLocalStore(() => new ProductStore(id!));

  const { product, meta, getProduct } = store;

  React.useEffect(() => {
    getProduct().then(() => {
      if (meta === Meta.Error) {
        navigate('/404');
      }
    });
  }, [meta]);

  return (
    <>
      <div className={styles.backButton} onClick={() => navigate(-1)}>
        <BackIcon color="primary" />
        <Text tag={TextTag.Span} view={TextView.P20} color={TextColor.Primary}>
          Back
        </Text>
      </div>
      <div className={styles.product}>
        <img
          className={styles.productImage}
          src={product?.images[0]}
          alt={product?.title}
        />
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
            {product?.category}
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
