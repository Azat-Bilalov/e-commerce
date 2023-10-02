import { CategoryApi, CategoryModel, normalizeCategory } from './category';

export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryApi;
}

export interface ProductModel {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryModel;
}

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  price: from.price,
  description: from.description,
  images: from.images,
  creationAt: from.creationAt,
  updatedAt: from.updatedAt,
  category: normalizeCategory(from.category),
});
