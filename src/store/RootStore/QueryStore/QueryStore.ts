import qs from 'qs';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_params';

export default class QueryStore {
  private _params: qs.ParsedQs = {};
  private _query: string = '';

  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _params: observable.ref,
      setQuery: action.bound,
    });
  }

  get getParams() {
    return this._params;
  }

  getParam(
    key: string,
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setQuery(query: string) {
    query = query.replace(/^\?/, '');
    this._query = query;
    this._params = qs.parse(query);
  }
}
