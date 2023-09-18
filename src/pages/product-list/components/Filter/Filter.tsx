import React from 'react';
import MultiDropdown from '@/components/MultiDropdown';
import { Option } from '@/components/MultiDropdown';
import { useSession } from '@/app/SessionProvider';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type FilterProps = {
  className?: string;
};

const Filter: React.FC<FilterProps> = ({ className }) => {
  const session = useSession();
  const { categories, getCategories } = session.categoriesStore;
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    getCategories();
  }, []);

  /** устанавливаем опции для MultiDropdown */
  const options = React.useMemo(() => {
    return categories?.order.map((key) => ({
      key: `${key}`,
      value: categories.entities[key].name,
    }));
  }, [categories]);

  const [filter, setFilter] = React.useState([] as Option[]);

  /** активные категории из строки поиска */
  React.useEffect(() => {
    if (categories.order.length === 0) {
      setFilter([]);
      return;
    }

    const queryKeys = searchParams.get('categories')?.split('|') || [];
    const activeCategories = queryKeys
      .filter((key) => !!Number(key) && categories.order.includes(+key))
      .map((key) => ({
        key: `${key}`,
        value: categories.entities[+key].name,
      }));
    setFilter(activeCategories);
  }, [categories, searchParams]);

  /** устанавливаем активные категории */
  const handleChange = React.useCallback((options: Option[]) => {
    setFilter(options);
    const newQueryKeys = options.map((option) => option.key).join('|');

    if (newQueryKeys) {
      searchParams.set('categories', newQueryKeys);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('categories');
      setSearchParams(searchParams);
    }
  }, []);

  /** получаем заголовок для MultiDropdown */
  const getTitle = React.useCallback(
    (options: Option[]) => {
      if (options.length === 0) return 'Filter';
      if (options.length === 1) return options[0].value;

      return `${options[0].value} +${options.length - 1}`;
    },
    [options],
  );

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
