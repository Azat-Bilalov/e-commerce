import React from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import _ from 'lodash';
import Text from '@components/Text';
import Loader from '@/components/Loader';
import SearchForm from './components/SearchForm';
import Filter from './components/Filter';
import ProductCard from './components/ProductCard';
import { requestProductList } from './api';
import { Category, Product } from '@/configs/api';

import './index.scss';

const ProductListPage = () => {
  const cnHero = cn('hero');
  const cnControls = cn('controls');
  const cnProducts = cn('products');

  const [searchParams, setSearchParams] = useSearchParams();

  const { products: initProducts, categories: initCategories } =
    useLoaderData() as {
      products: Product[];
      categories: Category[];
    };

  const products = React.useMemo(() => initProducts, [initProducts]);
  const [loading, setLoading] = React.useState(false);
  const [isEnd, setIsEnd] = React.useState(false);
  const [page, setPage] = React.useState(1);

  /** Получение списка товаров по категориям */
  const handleFilter = React.useCallback(
    (categories: string[]) => {
      const search = searchParams.get('search');

      if (search) {
        setSearchParams({ search, categories: categories.join('|') });
        return;
      }

      setSearchParams({ categories: categories.join('|') });
    },
    [searchParams],
  );

  /** Получение списка товаров по поиску */
  const handleSearch = React.useCallback(
    (search: string) => {
      const categories = searchParams.get('categories');

      if (categories) {
        setSearchParams({ search, categories });
        return;
      }

      setSearchParams({ search });
    },
    [searchParams],
  );

  /** Получение списка товаров при скролле */
  // TODO: вынести в отдельный хук
  React.useEffect(() => {
    const handleScroll = () => {
      if (loading || isEnd) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setLoading(true);
        const search = searchParams.get('search') || '';
        const categories = searchParams.get('categories') || '';
        requestProductList({ page: page + 1, search, categories }).then(
          (data) => {
            if (data.products && data.products.length) {
              products.push(...data.products);
              setLoading(false);
              setPage(page + 1);
            } else {
              setLoading(false);
              setIsEnd(true);
              window.removeEventListener('scroll', debouncedHandleScroll);
            }
          },
        );
      }
    };

    const debouncedHandleScroll = _.debounce(handleScroll, 500);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [loading, isEnd, page]);

  /** сброс isEnd при изменении параметров */
  React.useEffect(() => {
    setIsEnd(false);
    setPage(1);
  }, [searchParams]);

  return (
    <>
      <div className={cnHero()}>
        <Text tag="h1" view="title">
          Product List
        </Text>
        <Text view="p-20" color="secondary">
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Text>
      </div>
      <div className={cnControls()}>
        <SearchForm
          className={cnControls('search-form')}
          onSubmit={handleSearch}
          initValue={searchParams.get('search') || ''}
        />
        <Filter
          className={cnControls('filter')}
          categories={initCategories}
          initValue={searchParams.get('categories')?.split('|')}
          setActiveCategories={handleFilter}
        />
      </div>
      <div className={cnProducts()}>
        <div className={cnProducts('title')}>
          <Text view="title">Total Product</Text>
          <Text view="p-20" weight="bold" color="accent">
            {products.length}
          </Text>
        </div>
        <div className={cnProducts('items')}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {loading && !isEnd && (
          <div className={cnProducts('loader')}>
            <Loader />
          </div>
        )}
        {isEnd && (
          <div className={cnProducts('end')}>
            <Text view="p-20" weight="bold" color="accent">
              End of list
            </Text>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListPage;
