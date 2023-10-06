import { Meta } from '@/utils/meta';
import { ILocalStore } from '@/utils/useLocalStore';
import {
  CollectionModel,
  getEmptyCollection,
  normalizeCollection,
} from '../../models/shared/collection';
import { ProductApi, ProductModel } from '../../models/products/product';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { GetProductsListParams, GetQueryParams } from './types';
import { api } from '@/configs';

const PRODUCT_PER_PAGE = 12;

type PrivateFields = '_products' | '_meta' | '_params' | '_endOfList';

export class ProductListStore implements ILocalStore {
  private _products: CollectionModel<number, ProductModel> =
    getEmptyCollection();
  private _meta = Meta.Initial;
  private _params: GetQueryParams = {};
  private _endOfList = false;

  constructor() {
    makeObservable<ProductListStore, PrivateFields>(this, {
      _products: observable.ref,
      _meta: observable,
      _params: observable,
      _endOfList: observable,
      meta: computed,
      products: computed,
      endOfList: computed,
      setParams: action.bound,
      getProductList: action.bound,
      loadMoreProducts: action.bound,
    });
  }

  get products() {
    return this._products;
  }

  get meta() {
    return this._meta;
  }

  get endOfList() {
    return this._endOfList;
  }

  /** При изменении параметров запроса, обновляем список */
  setParams(params: GetQueryParams) {
    this._params = params;

    // side effects
    this._endOfList = false;
    this._products = getEmptyCollection();
    this.loadMoreProducts();
  }

  /** Общая функция для получения списка продуктов */
  async getProductList(params: GetProductsListParams) {
    if (this._endOfList) return;

    this._meta = Meta.Loading;

    const productsResponse = await api.get<ProductApi[]>('products', {
      params: params,
    });

    runInAction(() => {
      if (productsResponse.status !== 200) {
        this._meta = Meta.Error;
        return;
      }

      try {
        if (productsResponse.data.length < PRODUCT_PER_PAGE) {
          this._endOfList = true;
        }

        const productsCollection = normalizeCollection(
          productsResponse.data,
          (product) => product.id,
        );

        this._products =
          params?.offset !== 0
            ? {
                order: [...this._products.order, ...productsCollection.order],
                entities: {
                  ...this._products.entities,
                  ...productsCollection.entities,
                },
              }
            : productsCollection;
        this._meta = Meta.Success;
      } catch (err) {
        console.log(err);
        this._meta = Meta.Error;
      }
    });
  }

  /** Загрузка дополнительных продуктов */
  async loadMoreProducts() {
    const offset = this._products.order.length;
    const limit = PRODUCT_PER_PAGE;
    const params = { ...this._params, offset, limit };

    await this.getProductList(params);
  }

  destroy() {}
}
