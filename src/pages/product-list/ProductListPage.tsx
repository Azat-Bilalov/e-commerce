import _ from 'lodash';
import Text, { TextColor, TextTag, TextView } from '@components/Text';
import SearchForm from './components/SearchForm';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import ProductsProvider from '@/store/ProductsStore/ProductsProvider';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  return (
    <ProductsProvider>
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
      <ProductList />
    </ProductsProvider>
  );
};

export default ProductListPage;
