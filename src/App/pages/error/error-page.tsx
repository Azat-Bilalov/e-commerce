import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Text from '@/components/Text';
import Button from '@/components/Button';

import './index.scss';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="error-page">
        <Text view="title">404</Text>
        <Text view="p-20" weight="bold">
          Sorry, we couldn't find this page.
        </Text>
        <Text view="p-18" color="secondary">
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
