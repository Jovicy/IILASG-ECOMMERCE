export interface Image {
  id: string;
  url: string;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  discount: number;
  categoryId: string;
  stockStatus: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  features: string[];
  images: Image[];
}

export interface CreateProductPayload {
  name: string;
  categoryId: string;
  description?: string;
  price: number;
  quantity: number;
  discount?: number;
  features?: string[];
  images?: File[];
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  removedImageIds?: string[];
}

export interface ReviewPayload {
  rating: number;
  comment: string;
}
