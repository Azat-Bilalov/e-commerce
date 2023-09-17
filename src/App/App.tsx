import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
