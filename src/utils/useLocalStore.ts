import React from 'react';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const store = React.useRef<T | null>(null);
  if (!store.current) {
    store.current = creator();
  }

  React.useEffect(() => store.current?.destroy, []);

  return store.current;
};
