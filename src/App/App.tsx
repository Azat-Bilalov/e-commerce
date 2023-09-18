import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import SessionProvider from './SessionProvider';
import '@/configs/configureMobX';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <SessionProvider>
        <RouterProvider router={Router} />
      </SessionProvider>
    </div>
  );
}

export default App;
