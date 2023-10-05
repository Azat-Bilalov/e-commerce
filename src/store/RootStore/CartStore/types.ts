import { ProductModel } from '@/store/models/products';

export type ProductCartModel = ProductModel & {
  count: number;
};
