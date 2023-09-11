import { useNavigate } from 'react-router-dom';
import { Product } from '@/configs/api';
import Card from '@/components/Card';
import Button from '@/components/Button/Button';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, ...props }) => {
  const navigate = useNavigate();

  return (
    <Card
      key={product.id}
      captionSlot={product.category}
      title={product.title}
      subtitle={product.description}
      image={product.images[0]}
      contentSlot={`$${product.price}`}
      onClick={() => navigate(`/product/${product.id}`)}
      actionSlot={<Button>Add to Card</Button>}
      {...props}
    />
  );
};

export default ProductCard;
