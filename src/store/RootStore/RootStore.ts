import CartStore from './CartStore';
import QueryStore from './QueryStore';

export default class RootStore {
  readonly cart: CartStore;
  readonly query: QueryStore;

  constructor() {
    this.cart = new CartStore();
    this.query = new QueryStore();
  }
}
