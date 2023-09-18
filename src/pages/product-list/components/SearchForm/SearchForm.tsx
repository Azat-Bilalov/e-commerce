import React from 'react';
import cn from 'classnames';
import Input from '@/components/Input';
import Button from '@/components/Button';

import styles from './SearchForm.module.scss';
import { useSearchParams } from 'react-router-dom';

type SearchFormProps = {
  className?: string;
};

const SearchForm: React.FC<SearchFormProps> = ({ className }) => {
  const cnSearchForm = cn(styles.searchForm, className);

  const [value, setValue] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (value: string) => {
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search.value;

    if (value) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  React.useEffect(() => {
    const search = searchParams.get('search') || '';
    setValue(search);
  }, [searchParams]);

  return (
    <form className={cnSearchForm} onSubmit={handleSubmit}>
      <Input
        placeholder="Search"
        value={value}
        onChange={handleSearchChange}
        name="search"
      />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default SearchForm;
