import React from 'react';
import ProductsStore from '@/store/ProductsStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const ProductsContext = React.createContext<ProductsStore | null>(null);

export type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const productStore = useLocalStore(() => new ProductsStore());

  return (
    <ProductsContext.Provider value={productStore}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductsContext);
  if (context === null) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export default ProductsProvider;
