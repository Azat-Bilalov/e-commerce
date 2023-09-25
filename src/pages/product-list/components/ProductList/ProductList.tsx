import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Text, { TextView, TextWeight, TextColor } from '@/components/Text';
import ProductCard from '../ProductCard';
import InfinityScroll from '../InfinityScroll';
import { observer } from 'mobx-react-lite';
import { useProducts } from '@/store/ProductsStore/ProductsProvider';

import styles from './ProductList.module.scss';

export type ProductListProps = {};

const ProductList: React.FC<ProductListProps> = () => {
  const store = useProducts();
  const { products, meta, endOfList, setParams, loadMoreProducts } =
    store.productsListStore;

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories') || '';
    setParams({ substring: search, include: categories });
  }, [searchParams]);

  return (
    <div className={styles.products}>
      <div className={styles.productsTitle}>
        <Text view={TextView.Title}>Total Product</Text>
        <Text
          view={TextView.P20}
          weight={TextWeight.Bold}
          color={TextColor.Accent}
        >
          {products.order.length}
        </Text>
      </div>
      <InfinityScroll
        meta={meta}
        endOfList={endOfList}
        loadMore={loadMoreProducts}
        className={styles.productsItems}
      >
        {products.order.map((id) => (
          <ProductCard key={id} product={products.entities[id]} />
        ))}
      </InfinityScroll>
    </div>
  );
};

export default observer(ProductList);
