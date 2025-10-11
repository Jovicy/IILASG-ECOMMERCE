import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

export const useGetAllProducts = (search?: string, sortBy?: "sold" | "new" | "price_asc" | "price_desc" | "rating", page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["products", search, sortBy, page, limit],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetchWrapper({
        url: `/product?search=${search || ""}&sortBy=${sortBy || ""}&page=${page}&limit=${limit}`,
        method: "GET",
      });
      return response.data;
    },
  });
};
