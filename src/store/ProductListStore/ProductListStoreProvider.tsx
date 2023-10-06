import React from 'react';
import ProductListStore from './ProductListStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const ProductListContext = React.createContext<ProductListStore | null>(
  null,
);

export type ProductListProviderProps = {
  children: React.ReactNode;
};

const ProductListProvider = ({ children }: ProductListProviderProps) => {
  const productListStore = useLocalStore(() => new ProductListStore());

  return (
    <ProductListContext.Provider value={productListStore}>
      {children}
    </ProductListContext.Provider>
  );
};

export const useProductListStore = () => {
  const context = React.useContext(ProductListContext);
  if (context === null) {
    throw new Error('useProductList must be used within a ProductListProvider');
  }
  return context;
};

export default ProductListProvider;
