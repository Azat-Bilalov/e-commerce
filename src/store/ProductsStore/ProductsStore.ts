import { ProductListStore } from './stores/ProductListStore';
import { CategoriesFilterStore } from './stores/CategoriesFilterStore';
import { ILocalStore } from '@/utils/useLocalStore';

/** Композиция сторов */
export class ProductsStore implements ILocalStore {
  productsListStore: ProductListStore;
  categoriesFilterStore: CategoriesFilterStore;

  constructor() {
    this.productsListStore = new ProductListStore();
    this.categoriesFilterStore = new CategoriesFilterStore();

    console.log(this.productsListStore);
  }

  destroy() {
    this.productsListStore.destroy();
    this.categoriesFilterStore.destroy();
  }
}
