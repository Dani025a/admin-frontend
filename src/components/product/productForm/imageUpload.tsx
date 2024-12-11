import React, { useState, useEffect } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  images: (File | string)[];
  setImages: (images: (File | string)[]) => void;
}

function ImageUpload({ images, setImages }: ImageUploadProps) {
  const [previewImages, setPreviewImages] = useState<(File | string)[]>([]);

  useEffect(() => {
    setPreviewImages(images);
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="image-upload-container">
      <label htmlFor="image-upload" className="custom-upload-button">
        Upload Images
      </label>
      <input
        type="file"
        id="image-upload"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <div className="image-preview">
        {previewImages.map((image, index) => (
          <div key={index} className="image-wrapper">
            {typeof image === 'string' ? (
              <img src={image} alt={`Product ${index}`} className="image-item" />
            ) : (
              <img
                src={URL.createObjectURL(image)}
                alt={`Product ${index}`}
                className="image-item"
              />
            )}
            <button
              type="button"
              className="remove-image-button"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
