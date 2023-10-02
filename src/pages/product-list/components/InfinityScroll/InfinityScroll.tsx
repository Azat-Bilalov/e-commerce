import React from 'react';
import _ from 'lodash';
import { Meta } from '@/utils/meta';
import Text, { TextColor, TextView, TextWeight } from '@/components/Text';

import styles from './InfinityScroll.module.scss';
import { CardLoader } from '@/components/Card';

export type InfinityScrollProps = {
  className?: string;
  loadMore: () => void;
  endOfList: boolean;
  meta: Meta;
  children: React.ReactNode;
};

const InfinityScroll: React.FC<InfinityScrollProps> = ({
  className,
  loadMore,
  endOfList,
  meta,
  children,
}) => {
  React.useEffect(() => {
    const handleScroll = () => {
      if (endOfList || meta === Meta.Loading || meta === Meta.Error) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      /** Подгружаем продукты на высоте 2h карточки от низа страницы */
      if (scrollTop + clientHeight >= scrollHeight - 1500) {
        loadMore();
      }
    };

    const debouncedHandleScroll = _.debounce(handleScroll, 300);
    window.addEventListener('scroll', debouncedHandleScroll);

    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, []);

  return (
    <div className={styles.infinityScroll}>
      <div className={className}>{children}</div>

      {meta === Meta.Error && (
        <div className={styles.infinityScrollError}>
          <Text view={TextView.P20} weight={TextWeight.Bold}>
            Something went wrong...
          </Text>
        </div>
      )}

      {(meta === Meta.Loading || meta === Meta.Initial) && !endOfList && (
        <div className={styles.infinityScrollCardsLoader}>
          <CardLoader />
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      )}

      {endOfList && (
        <div className={styles.infinityScrollEnd}>
          <Text
            view={TextView.P20}
            weight={TextWeight.Bold}
            color={TextColor.Accent}
          >
            End of list
          </Text>
        </div>
      )}
    </div>
  );
};

export default InfinityScroll;
