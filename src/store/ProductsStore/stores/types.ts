export type GetProductsListParams = {
  limit: number;
  offset: number;
  substring?: string;
  include?: string;
};

export type GetQueryParams = {
  substring?: string;
  include?: string;
};
