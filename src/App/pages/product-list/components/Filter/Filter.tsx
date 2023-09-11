import React from 'react';
import MultiDropdown from '@/components/MultiDropdown';
import { Category } from '@/configs/api';
import { Option } from '@/components/MultiDropdown';

type FilterProps = {
  className?: string;
  categories: Category[];
  initValue?: string[];
  setActiveCategories: (categories: string[]) => void;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  initValue,
  setActiveCategories,
  ...props
}) => {
  /** устанавливаем опции для MultiDropdown */
  const options = React.useMemo(
    () =>
      categories?.map((category) => ({
        key: `${category.id}`,
        value: category.name,
      })),
    [categories],
  );

  const [filter, setFilter] = React.useState([] as Option[]);

  /** активные категории из инициализации */
  React.useEffect(() => {
    if (initValue === undefined) {
      setFilter([]);
      return;
    }

    const activeCategories = categories
      .filter((category) => initValue.includes(`${category.id}`))
      .map((category) => ({
        key: `${category.id}`,
        value: category.name,
      }));
    setFilter(activeCategories);
  }, [categories]); // категории меняются только при загрузке страницы

  /** устанавливаем активные категории */
  const handleChange = React.useCallback(
    (options: Option[]) => {
      setFilter(options);
      const categories = options.map((option) => option.key);
      setActiveCategories(categories);
    },
    [setActiveCategories],
  );

  /** получаем заголовок для MultiDropdown */
  const getTitle = React.useCallback(
    (options: Option[]) => {
      return options.map((option) => option.value).join(', ') || 'Filter';
    },
    [options],
  );

  return (
    <MultiDropdown
      value={filter}
      options={options}
      onChange={handleChange}
      getTitle={getTitle}
      {...props}
    />
  );
};

export default Filter;
