import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import BackIcon from '@/components/icons/BackIcon';
import { CategoryModel } from '@/store/models/products';

import styles from './CategoryItem.module.scss';

export type CategoryItemProps = {
  category: CategoryModel;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <Link className={styles.categoryItem} to={`/?categories=${category.id}`}>
      <img
        className={styles.categoryItemImage}
        src={category.image}
        alt={category.name}
      />
      <div className={styles.categoryItemContent}>
        <Text
          tag={TextTag.H2}
          view={TextView.P20}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
          className={styles.categoryItemTitle}
        >
          {category.name}
        </Text>
      </div>
      {/* todo: замена иконки */}
      <div className={styles.categoryItemIcon}>
        <BackIcon color="primary" />
      </div>
    </Link>
  );
};

export default CategoryItem;
