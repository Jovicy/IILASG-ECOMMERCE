import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id?: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      if (!id) throw new Error("Category ID is required");
      const response = await fetchWrapper({
        url: `/category/${id}`,
        method: "GET",
      });
      return response.data;
    },
    enabled: !!id,
  });
};
