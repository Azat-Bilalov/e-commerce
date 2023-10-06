import React from 'react';
import ProductStore from './ProductStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const ProductStoreContext = React.createContext<ProductStore | null>(
  null,
);

export type ProductProviderProps = {
  children: React.ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const productStore = useLocalStore(() => new ProductStore());

  return (
    <ProductStoreContext.Provider value={productStore}>
      {children}
    </ProductStoreContext.Provider>
  );
};

export const useProductStore = () => {
  const context = React.useContext(ProductStoreContext);
  if (context === null) {
    throw new Error('useProductStore must be used within a ProductProvider');
  }
  return context;
};

export default ProductProvider;
