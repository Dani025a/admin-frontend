// useProduct.ts
import { useState } from "react";
import { apiClient } from "../services/ApiClientProduct";
import { Product, ProductCreationPayload, ApiError } from "../types/types";

interface UseProductResult {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  products: Product[] | null;
  product: Product | null;
  addProduct: (data: ProductCreationPayload) => Promise<void>;
  editProduct: (id: number, data: ProductCreationPayload) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProduct: (id: number) => Promise<void>;
  getAllProducts: () => Promise<void>;
}

const useProduct = (): UseProductResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const addProduct = async (data: ProductCreationPayload) => {
    console.log("data", data)
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("brand", data.brand);
      formData.append("weight", data.weight.toString());
      formData.append("length", data.length.toString());
      formData.append("width", data.width.toString());
      formData.append("height", data.height.toString());
      formData.append("status", data.status);
      formData.append("seoTitle", data.seoTitle);
      formData.append("seoDescription", data.seoDescription);
      formData.append("metaKeywords", data.metaKeywords);

      if (data.subSubCategoryId) {
        formData.append("subSubCategoryId", data.subSubCategoryId.toString());
      }
      if (data.discountId) {
        formData.append("discountId", data.discountId.toString());
      }

      console.log(data.filters)

      formData.append("filters", JSON.stringify(data.filters));


      const existingImageUrls: string[] = [];
      const newImageFiles: File[] = [];

      data.images?.forEach((image) => {
        if (typeof image === 'string') {
          existingImageUrls.push(image);
        } else {
          newImageFiles.push(image);
        }
      });

      if (existingImageUrls.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImageUrls));
      }

      if (newImageFiles.length > 0) {
        newImageFiles.forEach((image) => {
          formData.append("images", image);
        });
      }

      await apiClient.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add product.");
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (id: number, data: ProductCreationPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("brand", data.brand);
      formData.append("weight", data.weight.toString());
      formData.append("length", data.length.toString());
      formData.append("width", data.width.toString());
      formData.append("height", data.height.toString());
      formData.append("status", data.status);
      formData.append("seoTitle", data.seoTitle);
      formData.append("seoDescription", data.seoDescription);
      formData.append("metaKeywords", data.metaKeywords);
  
      if (data.subSubCategoryId) {
        formData.append("subSubCategoryId", data.subSubCategoryId.toString());
      }
      if (data.discountId) {
        formData.append("discountId", data.discountId.toString());
      }
  
      // Serialize filters and add them to FormData
      if (data.filters && data.filters.length > 0) {
        formData.append("filters", JSON.stringify(data.filters));
      }
  
      const existingImageUrls: string[] = [];
      const newImageFiles: File[] = [];
      
  
      data.images?.forEach((image) => {
        if (typeof image === "string") {
          existingImageUrls.push(image);
        } else {
          newImageFiles.push(image);
        }
      });
  
      if (existingImageUrls.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImageUrls));
      }
  
      if (newImageFiles.length > 0) {
        newImageFiles.forEach((image) => {
          formData.append("images", image);
        });
      }
  
      await apiClient.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to edit product.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await apiClient.delete(`/products/${id}`);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete product.");
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      
      const productData = response.data;

      if (productData.filters) {
        productData.filters = productData.filters.map((filter: any) => ({
          filterOptionId: filter.filterValue.filterOption.id,
          filterValueId: filter.filterValueId,
          filtervalue: filter.value,
        }));
      }

      console.log("Fetched Product:", response.data);

      setProduct(productData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch product.");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Product[]>("/products");
      
      const productsData = response.data.map((product: any) => {
        if (product.filters) {
          product.filters = product.filters.map((filter: any) => ({
            filterOptionId: filter.filterValue.filterOption.id,
            filterValueId: filter.filterValueId,
            filter: filter.filtervalue
          }));
        }
        return product;
      });

      setProducts(productsData);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    isLoading,
    error,
    success,
    products,
    product,
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
  };
};

export default useProduct;
