import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { MainLayout } from '../pages/layouts';
import { ProductListPage } from '../pages/product-list';
import { ProductPage } from '../pages/product';
import { CartPage } from '../pages/cart';
import { ErrorPage } from '../pages/error';
import { CategoryListPage } from '@/pages/category-list';
import { AboutPage } from '@/pages/about';
import { CheckoutPage } from '@/pages/checkout';

// todo: использовать лоадеры из react-router-dom
// const Router = createBrowserRouter([
const Router = createHashRouter([
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
        path: 'categories/',
        element: <CategoryListPage />,
      },
      {
        path: 'about/',
        element: <AboutPage />,
      },
      {
        path: 'checkout/',
        element: <CheckoutPage />,
      },
      {
        path: '404/',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default Router;
