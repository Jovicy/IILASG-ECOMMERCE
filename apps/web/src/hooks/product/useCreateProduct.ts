import { fetchWrapper } from "@/api/fetchWrapper";
import { CreateProductPayload, Product } from "@/types/product";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ProductResponse {
  status: string;
  message: string;
  data: Product;
}

export const useCreateProduct = (): UseMutationResult<AxiosResponse<ProductResponse>, Error, CreateProductPayload> => {
  return useMutation({
    mutationFn: async (payload: CreateProductPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("categoryId", payload.categoryId);
      formData.append("price", String(payload.price));
      formData.append("quantity", String(payload.quantity));

      if (payload.description) formData.append("description", payload.description);
      if (payload.discount) formData.append("discount", String(payload.discount));
      if (payload.features) formData.append("features", JSON.stringify(payload.features));
      if (payload.images) payload.images.forEach((img) => formData.append("images", img));

      return fetchWrapper({
        url: "/product",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
};
