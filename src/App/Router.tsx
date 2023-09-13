import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './pages/layouts';
import { ProductListPage, productListLoader } from './pages/product-list';
import { ProductPage, productLoader } from './pages/product';
import { ErrorPage } from './pages/error';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProductListPage />,
        loader: productListLoader,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: 'about/',
        element: <div>About</div>,
      },
    ],
  },
]);

export default Router;
