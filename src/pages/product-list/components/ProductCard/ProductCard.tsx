import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductModel } from '@/store/models/products';
import Card from '@/components/Card';
import Button from '@/components/Button/Button';

type ProductCardProps = {
  product: ProductModel;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, ...props }) => {
  const navigate = useNavigate();

  const handleClick = React.useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [product.id]);

  return (
    <Card
      key={product.id}
      captionSlot={product.category.name}
      title={product.title}
      subtitle={product.description}
      image={product.images[0]}
      contentSlot={`$${product.price}`}
      onClick={handleClick}
      actionSlot={<Button>Add to Card</Button>}
      {...props}
    />
  );
};

export default ProductCard;
