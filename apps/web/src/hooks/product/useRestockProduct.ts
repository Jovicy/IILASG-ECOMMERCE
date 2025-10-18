import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { Product } from "@/types/product";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface ProductResponse {
  message: string;
  data: Product;
}

export const useRestockProduct = (): UseMutationResult<AxiosResponse<ProductResponse>, Error> => {
  return useMutation({
    mutationFn: async ({ productId, data }: { productId: string; data: { quantity: number } }) => {
      return fetchWrapper({
        url: `/product/restock/${productId}`,
        method: "POST",
        data,
      });
    },
  });
};
