import React from 'react';
import CategoriesFilterStore from './CategoriesFilterStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const CategoriesFilterContext =
  React.createContext<CategoriesFilterStore | null>(null);

export type CategoriesFilterStoreProviderProps = {
  children: React.ReactNode;
};

const CategoriesFilterStoreProvider = ({
  children,
}: CategoriesFilterStoreProviderProps) => {
  const categoriesFilterStore = useLocalStore(
    () => new CategoriesFilterStore(),
  );

  return (
    <CategoriesFilterContext.Provider value={categoriesFilterStore}>
      {children}
    </CategoriesFilterContext.Provider>
  );
};

export const useCategoriesFilterStore = () => {
  const context = React.useContext(CategoriesFilterContext);
  if (context === null) {
    throw new Error(
      'useCategoriesFilterStore must be used within a CategoriesFilterStoreProvider',
    );
  }
  return context;
};

export default CategoriesFilterStoreProvider;
