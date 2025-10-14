import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

export const useGetProduct = (id: string) => {
  return useQuery<AxiosResponse<Product>>({
    queryKey: ["product", id],
    queryFn: async (): Promise<AxiosResponse<Product>> => {
      return await fetchWrapper({
        url: `/product/${id}`,
        method: "GET",
      });
    },
    enabled: !!id,
  });
};
