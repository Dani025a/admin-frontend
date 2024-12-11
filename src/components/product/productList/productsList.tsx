import React from 'react';
import ProductCard from '../productCard/productCard';
import './productList.css';
import { Product } from '../../../types/types';

interface ProductsListProps {
  products: Product[];
  onEditProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
}


export default function ProductsList({
  products,
  onEditProduct,
  onDeleteProduct,
}: ProductsListProps) {

  console.log(products)
  return (
    <div className="products-list-container">
      <div className="products-list-header">
        <h2 className="products-list-title">Products</h2>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}
