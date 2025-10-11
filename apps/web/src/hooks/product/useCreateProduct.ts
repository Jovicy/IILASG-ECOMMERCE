import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { CreateProductPayload, Product } from "@/types/product";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (payload: CreateProductPayload): Promise<Product> => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("categoryId", payload.categoryId);
      if (payload.description) formData.append("description", payload.description);
      if (payload.price) formData.append("price", String(payload.price));
      if (payload.stock) formData.append("stock", String(payload.stock));
      if (payload.images) payload.images.forEach((img) => formData.append("images", img));

      const response = await fetchWrapper({
        url: "/product",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};
