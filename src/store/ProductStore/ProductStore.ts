import { Meta } from '@/utils/meta';
import { ILocalStore } from '@/utils/useLocalStore';
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
  runInAction,
} from 'mobx';
import { api } from '@/configs';

type PrivateFields = '_product' | '_meta';

export default class ProductStore implements ILocalStore {
  private _product: ProductModel | null = null;
  private _meta = Meta.Initial;
  private _productId: string;

  constructor(id: string) {
    this._productId = id;

    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable.ref,
      _meta: observable,
      meta: computed,
      product: computed,
      fetchProduct: action.bound,
    });

    this.fetchProduct();
  }

  get product() {
    return this._product;
  }

  get meta() {
    return this._meta;
  }

  async fetchProduct() {
    this._meta = Meta.Loading;

    const productsResponse = await api.get<ProductApi>(
      `products/${this._productId}`,
    );

    runInAction(() => {
      if (productsResponse.status !== 200) {
        this._meta = Meta.Error;
        return;
      }

      try {
        this._product = normalizeProduct(productsResponse.data);
        this._meta = Meta.Success;
      } catch (err) {
        console.error(err);
        this._meta = Meta.Error;
      }
    });
  }

  destroy() {}
}
