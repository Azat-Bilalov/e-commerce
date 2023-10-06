import BackButton from './components/BackButton/BackButton';
import ProductItem from './components/ProductItem/ProductItem';
import ProductProvider from '@/store/ProductStore';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';

import styles from './ProductPage.module.scss';

const ProductPage = () => {
  return (
    <ProductProvider>
      <BackButton className={styles.backButton} />
      <ProductItem />
      <RelatedProducts />
    </ProductProvider>
  );
};

export default ProductPage;
