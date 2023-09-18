import React from 'react';
import _ from 'lodash';
import { Meta } from '@/utils/meta';
import Loader from '@/components/Loader';
import Text, { TextColor, TextView, TextWeight } from '@/components/Text';

import styles from './InfinityScroll.module.scss';

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
      if (endOfList) return;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 5) {
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

      {meta === Meta.Loading && !endOfList && (
        <div className={styles.infinityScrollLoader}>
          <Loader />
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
