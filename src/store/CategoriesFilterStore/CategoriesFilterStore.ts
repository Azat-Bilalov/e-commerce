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
import { Option } from '@/components/MultiDropdown';

type PrivateFields = '_categories' | '_meta' | '_filter';

export default class CategoriesFilterStore implements ILocalStore {
  private _categories: CollectionModel<number, CategoryModel> =
    getEmptyCollection();
  private _meta = Meta.Initial;
  private _filter: Option[] = [];

  constructor() {
    makeObservable<CategoriesFilterStore, PrivateFields>(this, {
      _categories: observable.ref,
      _meta: observable,
      _filter: observable.ref,
      options: computed,
      meta: computed,
      filter: computed,
      setFilter: action.bound,
      fetchCategories: action.bound,
    });

    this.fetchCategories();
  }

  /** возращает массив объектов для отображения в фильтре */
  get options() {
    return this._categories.order.map((key) => ({
      key: String(key),
      value: this._categories.entities[key].name,
    }));
  }

  get meta() {
    return this._meta;
  }

  get filter() {
    return this._filter;
  }

  setFilter(value: Option[]) {
    this._filter = value;
  }

  /** Загружает категории */
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
          categoriesResponse.data,
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
