import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../pages/layouts';
import { ProductListPage } from '../pages/product-list';
import { ProductPage } from '../pages/product';
import { CartPage } from '../pages/cart';
import { ErrorPage } from '../pages/error';

// todo: использовать лоадеры из react-router-dom
const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ProductListPage />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'cart/',
        element: <CartPage />,
      },
      {
        path: 'about/',
        element: <div>About</div>,
      },
      {
        path: '404/',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default Router;
