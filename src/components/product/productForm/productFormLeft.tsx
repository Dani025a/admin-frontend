// src/components/ProductForm/ProductFormLeft.tsx
import React from 'react';
import ImageUpload from './imageUpload';
import InputField from '../../inputField';
import GlobalSelectField from '../../globalSelectField';
import { Status, ProductCreationPayload } from '../../../types/types';
import './productForm.css';
import TextArea from '../../textarea';

interface ProductFormLeftProps {
  formData: ProductCreationPayload;
  setFormData: React.Dispatch<React.SetStateAction<ProductCreationPayload>>;
}

function ProductFormLeft({ formData, setFormData }: ProductFormLeftProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' ||
        name === 'stock' ||
        name === 'weight' ||
        name === 'length' ||
        name === 'width' ||
        name === 'height'
          ? Number(value)
          : value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  return (
    <div className="product-form-left">
      <div className="form-group">
        <label htmlFor="product-images">Product Images</label>
        <ImageUpload
          images={formData.images || []}
          setImages={(images) =>
            setFormData((prev) => ({ ...prev, images }))
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <InputField
          type="text"
          id="name"
          name="name" // Added name
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Product Description</label>
        <TextArea
          id="description"
          name="description" // Added name
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="textarea-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <InputField
          type="number"
          id="price"
          name="price" // Added name
          value={formData.price.toString()}
          onChange={handleChange}
          placeholder="Price"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <InputField
          type="number"
          id="stock"
          name="stock" // Added name
          value={formData.stock.toString()}
          onChange={handleChange}
          placeholder="Stock"
        />
      </div>

      <div className="form-group">
        <label htmlFor="brand">Brand</label>
        <InputField
          type="text"
          id="brand"
          name="brand" // Added name
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
        />
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <InputField
          type="number"
          id="weight"
          name="weight" // Added name
          value={formData.weight.toString()}
          onChange={handleChange}
          placeholder="Weight"
        />
      </div>

      <div className="form-group">
        <label htmlFor="length">Length</label>
        <InputField
          type="number"
          id="length"
          name="length" // Added name
          value={formData.length.toString()}
          onChange={handleChange}
          placeholder="Length"
        />
      </div>

      <div className="form-group">
        <label htmlFor="width">Width</label>
        <InputField
          type="number"
          id="width"
          name="width" 
          value={formData.width.toString()}
          onChange={handleChange}
          placeholder="Width"
        />
      </div>

      <div className="form-group">
        <label htmlFor="height">Height</label>
        <InputField
          type="number"
          id="height"
          name="height" // Added name
          value={formData.height.toString()}
          onChange={handleChange}
          placeholder="Height"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status-select">Status</label>
        <GlobalSelectField
          id="status-select"
          value={formData.status}
          onChange={handleStatusChange}
          options={[
            { value: Status.active, label: 'Active' },
            { value: Status.inactive, label: 'Inactive' },
          ]}
          className="status-select"
          placeholder="Select Status"
        />
      </div>

      <div className="seo-section">
        <h4>SEO Details</h4>

        {/* SEO Title */}
        <div className="form-group">
          <label htmlFor="seoTitle">SEO Title</label>
          <InputField
            type="text"
            id="seoTitle"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            placeholder="SEO Title (max 60 characters)"
          />
        </div>

        {/* SEO Description */}
        <div className="form-group">
          <label htmlFor="seoDescription">SEO Description</label>
          <TextArea
            id="seoDescription"
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            placeholder="SEO Description (max 160 characters)"
            className="textarea-field"
          />
        </div>

        {/* Meta Keywords */}
        <div className="form-group">
          <label htmlFor="metaKeywords">Meta Keywords</label>
          <InputField
            type="text"
            id="metaKeywords"
            name="metaKeywords"
            value={formData.metaKeywords}
            onChange={handleChange}
            placeholder="Meta Keywords (comma separated)"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductFormLeft;
