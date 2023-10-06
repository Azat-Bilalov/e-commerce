import React from 'react';
import { ProductsStore } from '@/store/SessionStore';
import { useLocalStore } from '@/utils/useLocalStore';

export const SessionContext = React.createContext<ProductsStore | null>(null);

export type SessionProviderProps = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: SessionProviderProps) => {
  const productStore = useLocalStore(() => new ProductsStore());

  return (
    <SessionContext.Provider value={productStore}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (context === null) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionProvider;
