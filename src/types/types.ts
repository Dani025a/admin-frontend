export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export interface ProductCreationPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  subSubCategoryId?: number;
  discountId?: number;
  filters: { filterOptionId: number; filterValueId: number; filtervalue: string }[];
  images?: (File | string)[];
}

export interface UpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  subSubCategoryId?: number;
  discountId?: number;
  filters: { filterOptionId: number; filterValueId: number; filtervalue: string }[];
  existingImages?: string[];
  newImages?: File[];
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  discountId?: number;
  discount?: Discount;
  brand: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  subSubCategoryId?: number;
  subSubCategory?: SubSubCategory;
  images?: Image[];
  reviews?: Review[];
  filters?: FilterOption[];
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  discountId?: number;
  discount?: Discount;
  brand: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  subSubCategoryId?: number;
  subSubCategory?: SubSubCategory;
  images?: Image[];
  reviews?: Review[];
  filters?: FilterOption[];
}

export interface Discount {
  id: number;
  percentage: number;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  description: string;
  products?: Product[];
}

export interface MainCategory {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  subCategories?: SubCategory[];
  categoryFilterOptionCategories?: CategoryFilterOptionCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  mainCategoryId: number;
  mainCategory?: MainCategory;
  subSubCategories?: SubSubCategory[];
  categoryFilterOptionCategories?: CategoryFilterOptionCategory[];
}

export interface SubSubCategory {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  subCategoryId: number;
  subCategory?: SubCategory;
  products?: Product[];
  categoryFilterOptionCategories?: CategoryFilterOptionCategory[];
}

export enum FilterType {
  checkbox = 'checkbox',
  dropdown = 'dropdown',
  slider = 'slider',
}

export interface FilterValue {
  id: number;
  value: string;
}

export interface FilterOption {
  filterOptionId: any;
  id: number;
  name: string;
  type: FilterType;
  values?: FilterValue[]; 
  filterValues: FilterValue[]; 
}

export interface ProductFilter {
  filterOptionId: number;
  id: number;
  productId: number;
  filterValueId: number;
}

export interface Image {
  id: number;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  productId: number;
  product?: Product;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  productId: number;
  product?: Product;
}

export interface CategoryFilterOption {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  filterOptionId: number;
  filterOption?: FilterOption;
  categoryRelations?: CategoryFilterOptionCategory[];
}

export interface CategoryFilterOptionCategory {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  mainCategoryId?: number;
  mainCategory?: MainCategory;
  subCategoryId?: number;
  subCategory?: SubCategory;
  subSubCategoryId?: number;
  subSubCategory?: SubSubCategory;
  categoryFilterOptionId?: number;
  categoryFilterOption?: CategoryFilterOption;
}
export interface ApiError {
  message: string;
}