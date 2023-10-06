import { Meta } from '@/utils/meta';
import { ILocalStore } from '@/utils/useLocalStore';
import {
  CollectionModel,
  getEmptyCollection,
  normalizeCollection,
} from '../models/shared/collection';
import {
  ProductApi,
  ProductModel,
  normalizeProduct,
} from '../models/products/product';
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import { GetQueryParams, ResponseHeaders } from './types';
import { api } from '@/configs';
import { AxiosHeaders } from 'axios';
import rootStore from '@/store/RootStore/instance';
import { QueryModel, denormalizeQuery } from '@/store/models/query';
import { PRODUCT_PER_PAGE } from '@/configs/constants';

type PrivateFields =
  | '_products'
  | '_headers'
  | '_meta'
  | '_params'
  | '_endOfList';

export default class ProductListStore implements ILocalStore {
  private _products: CollectionModel<number, ProductModel> =
    getEmptyCollection();
  private _headers: ResponseHeaders | null = null;
  private _meta = Meta.Initial;
  private _params: GetQueryParams = {};
  private _endOfList = false;

  constructor() {
    makeObservable<ProductListStore, PrivateFields>(this, {
      _products: observable.ref,
      _headers: observable.ref,
      _meta: observable,
      _params: observable,
      _endOfList: observable,
      meta: computed,
      products: computed,
      total: computed,
      minPrice: computed,
      maxPrice: computed,
      endOfList: computed,
      getProductList: action.bound,
      loadMoreProducts: action.bound,
    });
  }

  get products() {
    return this._products;
  }

  get total() {
    return Number(this._headers?.['x-total-count'] ?? 0);
  }

  get minPrice() {
    return Number(this._headers?.['x-min-price'] ?? 0);
  }

  get maxPrice() {
    return Number(this._headers?.['x-max-price'] ?? 0);
  }

  get meta() {
    return this._meta;
  }

  get endOfList() {
    return this._endOfList;
  }

  /** Общая функция для получения списка продуктов */
  async getProductList(offset: number, limit: number, params?: QueryModel) {
    if (this._endOfList) return;

    this._meta = Meta.Loading;

    const _params = {
      ...denormalizeQuery(params ?? this._params),
      offset,
      limit,
    };

    const productsResponse = await api.get<ProductApi[]>('products', {
      params: _params,
    });

    runInAction(() => {
      if (productsResponse.status !== 200) {
        this._meta = Meta.Error;
        return;
      }

      if (productsResponse.headers instanceof AxiosHeaders) {
        this._headers = productsResponse.headers;
      }

      try {
        if (productsResponse.data.length < PRODUCT_PER_PAGE) {
          this._endOfList = true;
        }

        const productsCollection = normalizeCollection(
          productsResponse.data.map(normalizeProduct),
          (product) => product.id,
        );

        this._products =
          _params?.offset !== 0
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
        console.error(err);
        this._meta = Meta.Error;
      }
    });
  }

  /** Изначальная загрузка продуктов */
  async loadProducts() {
    this._endOfList = false;
    await this.getProductList(0, PRODUCT_PER_PAGE);
  }

  /** Загрузка дополнительных продуктов */
  async loadMoreProducts() {
    const offset = this._products.order.length;
    const limit = PRODUCT_PER_PAGE;

    await this.getProductList(offset, limit);
  }

  private readonly reactionDisposer = reaction(
    () => rootStore.query.getParams,
    (params) => {
      this._params = params;
      this.loadProducts();
    },
  );

  destroy() {
    this.reactionDisposer();
  }
}
