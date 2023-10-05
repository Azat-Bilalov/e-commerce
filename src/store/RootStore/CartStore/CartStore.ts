import { ProductModel } from '@/store/models/products';
import { ProductCartModel } from '@/store/RootStore/CartStore/types';
import {
  CollectionModel,
  getEmptyCollection,
} from '@/store/models/shared/collection';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_products';

export default class CartStore {
  private _products: CollectionModel<number, ProductCartModel> =
    getEmptyCollection();

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _products: observable.ref,
      products: computed,
      insert: action.bound,
      remove: action.bound,
      clear: action.bound,
    });

    const products = localStorage.getItem('cartProducts');
    if (products) {
      this._products = JSON.parse(products);
    }
  }

  get products() {
    return this._products;
  }

  insert(product: ProductModel, count: number = 1) {
    const products = { ...this._products };

    if (!this._products.order.includes(product.id)) {
      products.order.push(product.id);
    }
    products.entities[product.id] = {
      ...product,
      count: count,
    };

    this._products = products;
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }

  remove(productId: number) {
    const products = { ...this._products };

    delete products.entities[productId];
    products.order = products.order.filter((id) => id !== productId);

    this._products = products;
    localStorage.setItem('cartProducts', JSON.stringify(this._products));
  }

  clear() {
    localStorage.setItem('cartProducts', JSON.stringify(this._products));
  }
}
