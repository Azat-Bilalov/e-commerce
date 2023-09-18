import React from 'react';
import { useSearchParams } from 'react-router-dom';
import _ from 'lodash';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@components/Text';
import SearchForm from './components/SearchForm';
import Filter from './components/Filter';
import InfinityScroll from './components/InfinityScroll';
import ProductCard from './components/ProductCard';
import { observer } from 'mobx-react-lite';
import { useSession } from '@/app/SessionProvider';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const session = useSession();
  const { products, meta, endOfList, setParams, loadMoreProducts } =
    session.productsStore;
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories') || '';
    setParams({ substring: search, include: categories });
  }, [searchParams]);

  return (
    <>
      <div className={styles.hero}>
        <Text tag={TextTag.H1} view={TextView.Title}>
          Product List
        </Text>
        <Text view={TextView.P20} color={TextColor.Secondary}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className={styles.controls}>
        <SearchForm className={styles.controlsSearchForm} />
        <Filter className={styles.controlsFilter} />
      </div>
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
    </>
  );
};

export default observer(ProductListPage);
