import React from 'react';
import { RouterProvider } from 'react-router-dom';
import RootStoreProvider from '@/store/RootStore/RootStoreProvider';
import Router from './Router';
import '@/configs/configureMobX';

import styles from './App.module.scss';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.app}>
      <RootStoreProvider>
        <RouterProvider router={Router} />
      </RootStoreProvider>
    </div>
  );
};

export default App;
