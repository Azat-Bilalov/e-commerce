import { ProductListStore } from './ProductListStore';
import { CategoriesStore } from './CategoriesStore';
import { ILocalStore } from '@/utils/useLocalStore';

/** Композиция сторов */
export class ProductsStore implements ILocalStore {
  productsStore: ProductListStore;
  categoriesStore: CategoriesStore;

  constructor() {
    this.productsStore = new ProductListStore();
    this.categoriesStore = new CategoriesStore();
  }

  destroy() {
    this.productsStore.destroy();
    this.categoriesStore.destroy();
  }
}
