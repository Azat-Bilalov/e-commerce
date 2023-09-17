import React from 'react';
import { cn } from '@bem-react/classname';
import Input from '@/components/Input';
import Button from '@/components/Button';

import './SearchForm.scss';

type SearchFormProps = {
  className?: string;
  onSubmit: (value: string) => void;
  initValue?: string;
};

const SearchForm = ({ className, onSubmit, initValue }: SearchFormProps) => {
  const cnSearchForm = cn('search-form');

  const [search, setSearch] = React.useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.search.value;
    onSubmit(value);
  };

  React.useEffect(() => {
    if (initValue === undefined) return;
    setSearch(initValue);
  }, [initValue]);

  return (
    <form className={cnSearchForm(null, [className])} onSubmit={handleSubmit}>
      <Input
        className={cnSearchForm('search')}
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        name="search"
      />
      <Button className={cnSearchForm('button')} type="submit">
        Find now
      </Button>
    </form>
  );
};

export default SearchForm;
