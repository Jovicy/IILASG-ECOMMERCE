export interface Image {
  id: string;
  url: string;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: string;
  updatedAt: string;
  vendorProfileId: string;
}

export interface VendorProfile {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id?: string;
  rating?: number;
  comment?: string;
  userId?: string;
  user: {
    firstName: string;
    lastName: string;
    verified: boolean;
  };
  createdAt?: string;
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
  numberSold?: number;
  vendorProfileId?: string;
  vendorProfile?: VendorProfile;
  category?: Category;
  reviews?: Review[];
  stats: {
    averageRating: number;
    totalReviews: number;
  };
  isSaved: boolean;
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
