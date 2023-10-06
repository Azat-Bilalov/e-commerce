import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Meta } from '@/utils/meta';
import { useProductStore } from '@/store/ProductStore';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@components/Text';
import Carousel from '@/components/Carousel';
import Button from '@/components/Button/Button';
import { observer } from 'mobx-react-lite';

import styles from './ProductItem.module.scss';
import rootStore from '@/store/RootStore/instance';
import AddToCartModal from '@/pages/product-list/components/AddToCartModal';
import PriceChart from '../PriceChart';

const ProductItem: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { setProductId, product, meta } = useProductStore();

  React.useEffect(() => {
    setProductId(id!);
  }, [id]);

  React.useEffect(() => {
    if (meta === Meta.Error) {
      navigate('/404/');
    }
  }, [meta]);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = React.useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setOpenModal(false);
  }, []);

  if (!product) return null;

  return (
    <div className={styles.product}>
      <AddToCartModal
        product={openModal ? product : null}
        onClose={handleCloseModal}
      />
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
          <div className={styles.productPrice}>
            {product.discount !== 0 ? (
              <>
                <Text
                  view={TextView.Title}
                  color={TextColor.Accent}
                  weight={TextWeight.Bold}
                >
                  <s>${product?.price}</s>
                </Text>
                <Text tag={TextTag.H2} view={TextView.Title}>
                  $
                  {(
                    product?.price -
                    product?.price * product?.discount
                  ).toFixed(2)}
                </Text>
              </>
            ) : (
              <Text tag={TextTag.H2} view={TextView.Title}>
                ${product?.price}
              </Text>
            )}
          </div>
          {rootStore.cart.products.entities[+id!] ? (
            <Link to="/cart">
              <Button className={styles.productButton} outline>
                View in Cart
              </Button>
            </Link>
          ) : (
            <Button className={styles.productButton} onClick={handleOpenModal}>
              Add to Cart
            </Button>
          )}
        </div>
        <PriceChart product={product} />
      </div>
    </div>
  );
};

export default observer(ProductItem);
