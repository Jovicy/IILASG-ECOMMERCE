import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product> => {
      const response = await fetchWrapper({
        url: `/product/${id}`,
        method: "GET",
      });
      return response.data;
    },
    enabled: !!id,
  });
};
