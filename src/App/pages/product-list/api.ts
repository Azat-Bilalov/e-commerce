import { api, Product, Category } from '@/configs/api';

const CARD_PER_PAGE = 12;

type ProductListResult = {
  products: Product[];
  categories?: Category[];
};

export const requestProductList = async ({
  categories,
  search,
  page = 1,
}: any): Promise<ProductListResult> => {
  const offset = CARD_PER_PAGE * (Number(page) - 1);
  const limit = CARD_PER_PAGE;

  const productsResponse = await api.get<Product[]>('products', {
    params: { limit, offset, substring: search, include: categories },
  });

  if (page === 1) {
    const categoriesResponse = await api.get<Category[]>('categories');
    if (productsResponse.status === 200 && categoriesResponse.status === 200) {
      return {
        products: productsResponse.data,
        categories: categoriesResponse.data,
      };
    } else {
      throw new Response(productsResponse.statusText, {
        status: productsResponse.status,
      });
      // throw new Error(categoriesResponse.statusText);
    }
  } else {
    if (productsResponse.status === 200) {
      return {
        products: productsResponse.data,
      };
    } else {
      throw new Response(productsResponse.statusText, {
        status: productsResponse.status,
      });
      // throw new Error(productsResponse.statusText);
    }
  }
};

export const productListLoader = async ({
  request,
}: any): Promise<ProductListResult> => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const categories = searchParams.get('categories');
  const search = searchParams.get('search');
  const page = 1;

  return await requestProductList({ categories, search, page });
};
