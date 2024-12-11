// productCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SmallButton from '../../smallButton';
import './productCard.css';
import { Product } from '../../../types/types';

interface ProductCardProps {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productInformation/${product.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : '/path/to/placeholder.jpg';

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-row labels">
        <span>Image</span>
        <span>Name</span>
        <span>Stock</span>
        <span>Price</span>
      </div>
      <div className="product-row data">
        <span>
          <img src={imageUrl} alt={product.name} className="product-image" />
        </span>
        <span>{product.name}</span>
        <span>{product.stock}</span>
        <span>${Number(product.price).toFixed(2)}</span>
        <div className="buttons" onClick={handleButtonClick}>
          <SmallButton variant="update" onClick={() => onEdit(product.id!)}>
            Edit
          </SmallButton>
          <SmallButton variant="delete" onClick={() => onDelete(product.id!)}>
            Delete
          </SmallButton>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
