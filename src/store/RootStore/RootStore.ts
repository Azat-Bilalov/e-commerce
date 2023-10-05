import CartStore from './CartStore';

export default class RootStore {
  readonly cart: CartStore;

  constructor() {
    this.cart = new CartStore();
  }
}
