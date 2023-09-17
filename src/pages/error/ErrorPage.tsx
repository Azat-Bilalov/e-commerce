import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Text, {
  TextColor,
  TextTag,
  TextView,
  TextWeight,
} from '@/components/Text';
import Button from '@/components/Button';

import sytles from './ErrorPage.module.scss';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className={sytles.errorPage}>
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
