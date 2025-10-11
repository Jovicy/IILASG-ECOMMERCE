import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { UpdateProductPayload, Product } from "@/types/product";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateProductPayload }): Promise<Product> => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("categoryId", payload.categoryId);
      formData.append("price", String(payload.price));
      formData.append("quantity", String(payload.quantity));

      if (payload.description) formData.append("description", payload.description);
      if (payload.discount) formData.append("discount", String(payload.discount));
      if (payload.features) formData.append("features", JSON.stringify(payload.features));
      if (payload.images) payload.images.forEach((img) => formData.append("images", img));
      if (payload.removedImageIds) formData.append("removedImageIds", JSON.stringify(payload.removedImageIds));

      const response = await fetchWrapper({
        url: `/product/${id}`,
        method: "PATCH",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  });
};
