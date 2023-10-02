import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/Button';

type ResetButtonProps = {
  className?: string;
};

const ResetButton: React.FC<ResetButtonProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.delete('search');
    searchParams.delete('categories');
    searchParams.delete('min_price');
    searchParams.delete('max_price');
    searchParams.delete('sort');
    setSearchParams(searchParams);
  };

  return (
    <Button onClick={handleClick} className={className} outline>
      Reset
    </Button>
  );
};

export default React.memo(ResetButton);
