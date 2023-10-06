import { CategoryApi, CategoryModel, normalizeCategory } from './category';
import { CollectionModel, normalizeCollection } from '../shared/collection';

interface PriceHistoryApi {
  price: number;
  date: string;
  discount: string;
}

interface PriceHistoryModel {
  price: number;
  date: string;
  discount: number;
}

export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryApi;
  discount: number;
  priceHistory: PriceHistoryApi[];
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
  discount: number;
  priceHistory: CollectionModel<string, PriceHistoryModel>;
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
  discount: from.discount,
  priceHistory: normalizeCollection(
    from.priceHistory.map((priceHistory) => ({
      price: priceHistory.price,
      date: priceHistory.date,
      discount: Number(priceHistory.discount),
    })),
    (priceHistory) => priceHistory.date,
  ),
});
