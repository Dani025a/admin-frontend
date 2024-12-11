import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProduct from '../../hooks/useProducts';
import ProductsList from '../../components/product/productList/productsList';
import ConfirmationModal from '../../components/confirmationModal';
import Button from '../../components/button';

function Product() {
  const { getAllProducts, products, isLoading, error, deleteProduct } = useProduct();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/product');
  };

  const handleEditProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete !== null) {
      await deleteProduct(productToDelete);
      await getAllProducts();
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  

  return (
    <div>
      <h1>Products</h1>
      <Button onClick={handleAddProduct}>Add New Product</Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {products && (
        <ProductsList
          products={products}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onRequestClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}

export default Product;
