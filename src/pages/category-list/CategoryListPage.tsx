import Text, {
  TextTag,
  TextColor,
  TextView,
  TextWeight,
} from '@components/Text';
import CategoryList from './components/CategoryList';
import CategoryListProvider from '@/store/CategoryListStore/CategoryListStoreProvider';

import styles from './CategoryListPage.module.scss';

const CategoryListPage: React.FC = () => {
  return (
    <CategoryListProvider>
      <div className={styles.categoryList}>
        <Text
          tag={TextTag.H1}
          view={TextView.Title}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          Categories
        </Text>
        <CategoryList />
      </div>
    </CategoryListProvider>
  );
};

export default CategoryListPage;
