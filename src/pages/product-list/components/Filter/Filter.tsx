import React from 'react';
import 'rc-slider/assets/index.css';
import MultiDropdown from '@/components/MultiDropdown';
import { Option } from '@/components/MultiDropdown';
import { useProducts } from '@/store/ProductsStore/ProductsProvider';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const store = useProducts();
  const { options, filter, setFilter } = store.categoriesFilterStore;

  const [searchParams, setSearchParams] = useSearchParams();

  /** активные категории из строки поиска */
  React.useEffect(() => {
    if (options.length === 0) {
      setFilter([]);
      return;
    }

    const queryKeys = searchParams.get('categories')?.split('|') || [];

    const activeCategories = options.filter((option) =>
      queryKeys.includes(option.key),
    );
    setFilter(activeCategories);
  }, [searchParams, options]);

  /** устанавливаем активные категории */
  const handleChange = React.useCallback(
    (options: Option[]) => {
      setFilter(options);
      const newQueryKeys = options.map((option) => option.key).join('|');

      if (newQueryKeys) {
        searchParams.set('categories', newQueryKeys);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('categories');
        setSearchParams(searchParams);
      }
    },
    [searchParams],
  );

  /** функция отображения в фильтре */
  const getTitle = React.useCallback(() => {
    if (filter.length === 0) return 'Filter';
    if (filter.length === 1) return filter[0].value;

    return `${filter[0].value} +${filter.length - 1}`;
  }, [filter]);

  return (
    <MultiDropdown
      value={filter}
      options={options}
      onChange={handleChange}
      getTitle={getTitle}
      className={className}
    />
  );
};

export default observer(Filter);
