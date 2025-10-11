import { fetchWrapper } from "@/api/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export const useGetAllCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchWrapper({
        url: "/category",
        method: "GET",
      });
      return response.data;
    },
  });
};
