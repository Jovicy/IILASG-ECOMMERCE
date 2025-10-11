export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  status?: "AVAILABLE" | "LIMITED" | "OUT_OF_STOCK";
  images?: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  categoryId: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: File[];
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  status?: string;
}

export interface ReviewPayload {
  rating: number;
  comment: string;
}
