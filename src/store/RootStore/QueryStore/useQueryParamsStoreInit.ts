import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRootStore } from '../RootStoreProvider';

export const useQueryParamsStoreInit = (): void => {
  const rootStore = useRootStore();
  const { search } = useLocation();

  React.useEffect(() => {
    rootStore.query.setQuery(search);
  }, [search]);
};
