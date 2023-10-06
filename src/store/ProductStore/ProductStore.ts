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
  reaction,
  runInAction,
} from 'mobx';
import { api } from '@/configs';
import { RELATED_PRODUCT_COUNT } from '@/configs/constants';
import {
  CollectionModel,
  getEmptyCollection,
  normalizeCollection,
} from '../models/shared/collection';

type PrivateFields = '_productId' | '_product' | '_relatedProducts' | '_meta';

export default class ProductStore implements ILocalStore {
  private _productId: string | null = null;
  private _product: ProductModel | null = null;
  private _relatedProducts: CollectionModel<number, ProductModel> =
    getEmptyCollection();
  private _meta = Meta.Initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _productId: observable,
      _product: observable.ref,
      _relatedProducts: observable.ref,
      _meta: observable,
      meta: computed,
      product: computed,
      relatedProducts: computed,
      setProductId: action.bound,
      fetchProduct: action.bound,
    });
  }

  get product() {
    return this._product;
  }

  get relatedProducts() {
    return this._relatedProducts;
  }

  get meta() {
    return this._meta;
  }

  setProductId(id: string) {
    console.log(id);

    this._productId = id;
    this.fetchProduct();
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

      this.fetchRelatedProducts();
    });
  }

  private async fetchRelatedProducts() {
    if (!this._product) return;

    this._meta = Meta.Loading;

    const productsResponse = await api.get<ProductApi[]>('products', {
      params: {
        offset: 0,
        limit: RELATED_PRODUCT_COUNT + 1,
        include: this._product.category.id.toString(),
      },
    });

    runInAction(() => {
      if (productsResponse.status !== 200) {
        this._meta = Meta.Error;
        return;
      }

      try {
        const filteredProducts = productsResponse.data
          .filter((product) => product.id !== this._product?.id)
          .slice(0, RELATED_PRODUCT_COUNT);

        const productsCollection = normalizeCollection(
          filteredProducts.map(normalizeProduct),
          (product) => product.id,
        );

        this._relatedProducts = productsCollection;

        this._meta = Meta.Success;
      } catch (err) {
        console.error(err);
        this._meta = Meta.Error;
      }
    });
  }

  destroy() {}
}
