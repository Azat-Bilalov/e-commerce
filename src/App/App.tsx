import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import '@/configs/configureMobX';

import styles from './App.module.scss';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
