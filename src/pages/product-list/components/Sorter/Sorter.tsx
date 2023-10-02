import React from 'react';
import MultiDropdown from '@/components/MultiDropdown';
import { Option } from '@/components/MultiDropdown';
import { useSearchParams } from 'react-router-dom';

const options: Option[] = [
  {
    key: 'price',
    value: 'Price low to high',
  },
  {
    key: '-price',
    value: 'Price high to low',
  },
  {
    key: 'title',
    value: 'Name A-Z',
  },
  {
    key: '-title',
    value: 'Name Z-A',
  },
];

type SorterProps = {
  className?: string;
};

const Sorter: React.FC<SorterProps> = ({ className }) => {
  const [sort, setSort] = React.useState<Option | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  /** Обновление параметров запроса */
  React.useEffect(() => {
    const queryKey = searchParams.get('sort') || null;

    setSort(options.find((option) => option.key === queryKey) || null);
  }, [searchParams]);

  /** устанавливаем активные категории */
  const handleChange = React.useCallback(
    (options: Option[]) => {
      if (options.length === 0) {
        searchParams.delete('sort');
        setSearchParams(searchParams);
        setSort(null);
        return;
      }

      searchParams.set('sort', options[0].key);
      setSearchParams(searchParams);
      setSort(options[0]);
    },
    [searchParams],
  );

  /** функция отображения */
  const getTitle = React.useCallback(
    () => (sort ? sort.value : 'Sort by'),
    [sort],
  );

  return (
    <MultiDropdown
      value={sort ? [sort] : []}
      options={options}
      onChange={handleChange}
      getTitle={getTitle}
      className={className}
      maxSelected={1}
    />
  );
};

export default React.memo(Sorter);
