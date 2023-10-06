import React from 'react';
import CategoryListStore from './CategoryListStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const CategoryListStoreContext =
  React.createContext<CategoryListStore | null>(null);

export type CategoryListProviderProps = {
  children: React.ReactNode;
};

const CategoryListProvider = ({ children }: CategoryListProviderProps) => {
  const categoryListStore = useLocalStore(() => new CategoryListStore());

  return (
    <CategoryListStoreContext.Provider value={categoryListStore}>
      {children}
    </CategoryListStoreContext.Provider>
  );
};

export const useCategoryListStore = () => {
  const context = React.useContext(CategoryListStoreContext);
  if (context === null) {
    throw new Error(
      'useCategoryListStore must be used within a CategoryListStoreProvider',
    );
  }
  return context;
};

export default CategoryListProvider;
