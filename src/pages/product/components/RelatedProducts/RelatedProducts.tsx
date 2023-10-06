import React from 'react';
import Text, { TextTag, TextView } from '@components/Text';
import { observer } from 'mobx-react-lite';
import { useProductListStore } from '@/store/ProductListStore';
import { useProductStore } from '@/store/ProductStore';
import ProductCard from '@/pages/product-list/components/ProductCard';
import AddToCartModal from '@/pages/product-list/components/AddToCartModal';
import { ProductModel } from '@/store/models/products';

import styles from './RelatedProducts.module.scss';

const RelatedProducts: React.FC = () => {
  const { relatedProducts } = useProductStore();

  // todo: исправить баг с повторным запросом

  const [productForCart, setProductForCart] =
    React.useState<ProductModel | null>(null);

  const handleAddToCart = React.useCallback((product: ProductModel) => {
    setProductForCart(product);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setProductForCart(null);
  }, []);

  return (
    <div className={styles.products}>
      <div className={styles.productsTitle}>
        <Text tag={TextTag.H2} view={TextView.Title}>
          Related Items
        </Text>
      </div>
      <AddToCartModal product={productForCart} onClose={handleCloseModal} />
      <div className={styles.productsItems}>
        {relatedProducts.order.map((id: number) => (
          <ProductCard
            key={id}
            product={relatedProducts.entities[id]}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(RelatedProducts);
