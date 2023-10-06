import React from 'react';
import { observer } from 'mobx-react-lite';
import { useCategoryListStore } from '@/store/CategoryListStore';

import styles from './CategoryList.module.scss';
import CategoryItem from '../CategoryItem';

const CartProductList: React.FC = () => {
  const { categories } = useCategoryListStore();

  return (
    <div className={styles.categoryList}>
      {categories.order.map((id) => (
        <CategoryItem key={id} category={categories.entities[id]} />
      ))}
    </div>
  );
};

export default observer(CartProductList);
