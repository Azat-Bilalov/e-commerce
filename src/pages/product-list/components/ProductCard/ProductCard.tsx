import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '@/store/models/products';
import Card from '@/components/Card';
import Button from '@/components/Button/Button';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStore/RootStoreProvider';

type ProductCardProps = {
  product: ProductModel;
  onAddToCart?: (product: ProductModel) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  ...props
}) => {
  const rootStore = useRootStore();

  const navigate = useNavigate();

  const navToMore = React.useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [product.id]);

  const navToCart = React.useCallback(() => {
    navigate(`/cart`);
  }, []);

  const handleAddToCart = React.useCallback(() => {
    onAddToCart?.(product);
  }, [product, onAddToCart]);

  return (
    <Card
      key={product.id}
      captionSlot={product.category.name}
      title={product.title}
      subtitle={product.description}
      image={product.images[0]}
      contentSlot={`$${product.price}`}
      onClick={navToMore}
      actionSlot={
        rootStore.cart.products.order.includes(product.id) ? (
          <Button onClick={navToCart} outline>
            View in Cart
          </Button>
        ) : (
          <Button onClick={handleAddToCart} color="primary">
            Add to Card
          </Button>
        )
      }
      {...props}
    />
  );
};

export default observer(ProductCard);
