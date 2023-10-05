export type QueryModel = {
  search?: string;
  categories?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
};

export type QueryApi = {
  substring?: string;
  include?: string;
  min?: string;
  max?: string;
  sort?: string;
};

export function denormalizeQuery(from: QueryModel): QueryApi {
  return {
    substring: from.search,
    include: from.categories,
    min: from.min_price?.toString(),
    max: from.max_price?.toString(),
    sort: from.sort,
  };
}
