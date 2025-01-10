import React, { useState, useEffect } from 'react';
import useProduct from '../../../hooks/useProducts';
import { useCategory } from '../../../hooks/useCategory';
import { useNavigate, useParams } from 'react-router-dom';
import ProductFormLeft from './productFormLeft';
import LoadingScreen from '../../loadingScreen';
import SmallButton from '../../smallButton';
import { ProductCreationPayload, Status, SubSubCategory } from '../../../types/types';
import './productForm.css';
import ProductFormRight from './productFormRight';

function ProductForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { addProduct, editProduct, getProduct, product, isLoading, error, success } = useProduct();

  const subSubCategoryHook = useCategory<SubSubCategory>('SubSubCategory');
  const {
    data: subSubCategories,
    loading: subSubLoading,
    error: subSubError,
    getCategories: getSubSubCategories,
  } = subSubCategoryHook;

  useEffect(() => {
    getSubSubCategories();
    if (isEditMode && id) {
      getProduct(Number(id));
    }
  }, [isEditMode, id]);

  const [formData, setFormData] = useState<ProductCreationPayload>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    brand: '',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    status: Status.active,
    seoTitle: '',
    seoDescription: '',
    metaKeywords: '',
    filters: [],
    images: [],
  });

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price.toString()),
        stock: product.stock,
        brand: product.brand,
        weight: parseFloat(product.weight.toString()),
        length: parseFloat(product.length.toString()),
        width: parseFloat(product.width.toString()),
        height: parseFloat(product.height.toString()),
        status: product.status,
        seoTitle: product.seoTitle,
        seoDescription: product.seoDescription,
        metaKeywords: product.metaKeywords,
        subSubCategoryId: product.subSubCategoryId,
        filters: product.filters.map((f) => ({
          filterOptionId: f.filterOptionId,
          filterValueId: f.filterValueId,
        })),
        images: product.images.map((img) => img.url),
      });
    }
  }, [isEditMode, product]);

  useEffect(() => {
    if (success) {
      navigate('/products');
    }
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const combinedImages = [
      ...(formData.images || []).filter((img) => typeof img === 'string'),
      ...(formData.images || []).filter((img) => img instanceof File),
    ];
  
    // Create the final payload
    const payload = { ...formData, images: combinedImages };
  
    if (isEditMode && id) {
      await editProduct(Number(id), payload);
    } else {
      await addProduct(payload);
    }
  };

  if (isLoading || subSubLoading) return <LoadingScreen />;

  return (
    <div className="product-form-container">
      <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
      {error && <div className="error-message">{error}</div>}
      {subSubError && <div className="error-message">{subSubError}</div>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-sections">
          <ProductFormLeft formData={formData} setFormData={setFormData} />
          <ProductFormRight
            formData={formData}
            setFormData={setFormData}
            parentCategories={subSubCategories || []}
          />
        </div>
        <div className="form-actions">
          <SmallButton type="submit" variant="primary">
            {isEditMode ? 'Update Product' : 'Add Product'}
          </SmallButton>
          <SmallButton type="button" variant="delete" onClick={() => navigate('/products')}>
            Cancel
          </SmallButton>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
