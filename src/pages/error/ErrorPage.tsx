import { Link } from 'react-router-dom';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@/components/Text';
import Button from '@/components/Button';

import styles from './ErrorPage.module.scss';

// todo: обобщить под react-router-dom
const ErrorPage = () => {
  const error = {
    status: 404,
  };

  if (error.status === 404) {
    return (
      <div className={styles.errorPage}>
        <Text tag={TextTag.H1} view={TextView.Title}>
          404
        </Text>
        <Text view={TextView.P20} weight={TextWeight.Bold}>
          Sorry, we couldn't find this page.
        </Text>
        <Text view={TextView.P18} color={TextColor.Secondary}>
          But don’t worry, you can find plenty of other things on our homepage.
        </Text>
        <Link to="/">
          <Button>Go to homepage</Button>
        </Link>
      </div>
    );
  }

  throw error;
};

export default ErrorPage;
