import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { UpdateProductPayload, Product } from "@/types/product";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProductPayload }): Promise<Product> => {
      const response = await fetchWrapper({
        url: `/product/${id}`,
        method: "PATCH",
        data,
      });
      return response.data;
    },
  });
};
