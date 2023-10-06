export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getEmptyCollection = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const normalizeCollection = <K extends string | number, T>(
  elements: T[],
  getKeyForElement: (element: T) => K,
): CollectionModel<K, T> => {
  const collection = getEmptyCollection();

  elements.forEach((element) => {
    const key = getKeyForElement(element);
    collection.order.push(key);
    collection.entities[key] = element;
  });

  return collection;
};
