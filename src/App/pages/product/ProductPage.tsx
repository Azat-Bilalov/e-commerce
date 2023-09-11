import { useLoaderData, useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Text from '@components/Text';
import BackIcon from '@/components/icons/BackIcon';
import { Product } from '@/configs/api';

import './index.scss';
import Button from '@/components/Button/Button';

const ProductPage = () => {
  const cnBackButton = cn('back-button');
  const cnProduct = cn('product');

  const navigate = useNavigate();

  const product: Product = useLoaderData() as Product;

  return (
    <>
      <div className={cnBackButton()} onClick={() => navigate(-1)}>
        <BackIcon color="primary" />
        <Text tag="span" view="p-20" color="primary">
          Back
        </Text>
      </div>
      <div className={cnProduct()}>
        <img
          className={cnProduct('image')}
          src={product.images[0]}
          alt={product.title}
        />
        <div className={cnProduct('content')}>
          <Text tag="h1" view="title">
            {product.title}
          </Text>
          <Text tag="h2" view="p-20" color="accent" weight="bold">
            {product.category}
          </Text>
          <Text tag="p" view="p-20" color="secondary">
            {product.description}
          </Text>
          <div className={cnProduct('actions')}>
            <Text tag="h2" view="title">
              ${product.price}
            </Text>
            <div className={cnProduct('buttons')}>
              <Button>Buy now</Button>
              <Button outline>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
