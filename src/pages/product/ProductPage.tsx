import { useLoaderData, useNavigate } from 'react-router-dom';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@components/Text';
import BackIcon from '@/components/icons/BackIcon';
import { Product } from '@/configs/api';

import styles from './ProductPage.module.scss';
import Button from '@/components/Button/Button';

const ProductPage = () => {
  const navigate = useNavigate();

  const product: Product = useLoaderData() as Product;

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
          src={product.images[0]}
          alt={product.title}
        />
        <div className={styles.productContent}>
          <Text tag={TextTag.H1} view={TextView.Title}>
            {product.title}
          </Text>
          <Text
            tag={TextTag.H2}
            view={TextView.P20}
            color={TextColor.Accent}
            weight={TextWeight.Bold}
          >
            {product.category}
          </Text>
          <Text view={TextView.P20} color={TextColor.Secondary}>
            {product.description}
          </Text>
          <div className={styles.productActions}>
            <Text tag={TextTag.H2} view={TextView.Title}>
              ${product.price}
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

export default ProductPage;
