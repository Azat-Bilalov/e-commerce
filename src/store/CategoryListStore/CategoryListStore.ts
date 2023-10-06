import { Meta } from '@/utils/meta';
import { ILocalStore } from '@/utils/useLocalStore';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { api } from '@/configs';
import {
  CollectionModel,
  getEmptyCollection,
  normalizeCollection,
} from '../models/shared/collection';
import {
  CategoryApi,
  CategoryModel,
  normalizeCategory,
} from '../models/products';

type PrivateFields = '_categories' | '_meta';

export default class CategoryListStore implements ILocalStore {
  private _categories: CollectionModel<number, CategoryModel> =
    getEmptyCollection();
  private _meta = Meta.Initial;

  constructor() {
    makeObservable<CategoryListStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      meta: computed,
      categories: computed,
      fetchCategories: action.bound,
    });

    this.fetchCategories();
  }

  get categories() {
    return this._categories;
  }

  get meta() {
    return this._meta;
  }

  async fetchCategories() {
    this._meta = Meta.Loading;

    const categoriesResponse = await api.get<CategoryApi[]>('categories');

    runInAction(() => {
      if (categoriesResponse.status !== 200) {
        this._meta = Meta.Error;
        return;
      }

      try {
        const categoriesCollection = normalizeCollection(
          categoriesResponse.data.map(normalizeCategory),
          (category) => category.id,
        );

        this._categories = categoriesCollection;

        this._meta = Meta.Success;
      } catch (err) {
        console.error(err);
        this._meta = Meta.Error;
      }
    });
  }

  destroy() {}
}
