import { AxiosHeaders } from 'axios';

export type GetProductsListParams = {
  limit: number;
  offset: number;
  substring?: string;
  include?: string;
};

export type GetQueryParams = {
  substring?: string;
  include?: string;
  min?: string;
  max?: string;
  sort?: string;
};

export type ResponseHeaders = AxiosHeaders & {
  'x-total-count'?: string;
  'x-max-price'?: string;
  'x-min-price'?: string;
};
