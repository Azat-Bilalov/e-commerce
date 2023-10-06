import { Meta } from '@/utils/meta';
import { ILocalStore } from '@/utils/useLocalStore';
import {
  CollectionModel,
  getEmptyCollection,
  normalizeCollection,
} from '../models/shared/collection';
import { CategoryApi, CategoryModel } from '../models/products/category';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { api } from '@/configs';

type PrivateFields = '_categories' | '_meta';

export class CategoriesStore implements ILocalStore {
  private _categories: CollectionModel<number, CategoryModel> =
    getEmptyCollection();
  private _meta = Meta.Initial;

  constructor() {
    console.log('CategoriesStore.constructor');
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      categories: computed,
      meta: computed,
      getCategories: action.bound,
    });
  }

  get categories() {
    return this._categories;
  }

  get meta() {
    return this._meta;
  }

  async getCategories() {
    this._meta = Meta.Loading;

    const categoriesResponse = await api.get<CategoryApi[]>('categories');

    runInAction(() => {
      try {
        if (categoriesResponse.status !== 200) {
          throw new Error(categoriesResponse.statusText);
        }

        const categoriesCollection = normalizeCollection(
          categoriesResponse.data,
          (category) => category.id,
        );

        this._categories = categoriesCollection;
        this._meta = Meta.Success;
      } catch (err) {
        console.log(err);
        this._meta = Meta.Error;
      }
    });
  }

  destroy() {
    console.log('CategoriesStore.destroy');
  }
}
