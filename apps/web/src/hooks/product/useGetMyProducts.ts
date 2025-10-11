import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}

export const useGetMyProducts = (search?: string, status?: "AVAILABLE" | "LIMITED" | "OUT_OF_STOCK", page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["my-products", search, status, page, limit],
    queryFn: async (): Promise<ProductResponse> => {
      const response = await fetchWrapper({
        url: `/product/my-products?search=${search || ""}&status=${status || ""}&page=${page}&limit=${limit}`,
        method: "GET",
      });

      return response.data;
    },
  });
};
