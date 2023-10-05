import React from 'react';
import RootStore from './RootStore';
import rootStore from './instance';

export const RootStoreContext = React.createContext<RootStore | null>(null);

export type RootStoreProviderProps = {
  children: React.ReactNode;
};

const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
  // const rootStore = React.useMemo(() => new RootStore(), []);

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = React.useContext(RootStoreContext);

  if (context === null) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};

export default RootStoreProvider;
