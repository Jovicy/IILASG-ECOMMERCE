import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await fetchWrapper({
        url: `/product/${id}`,
        method: "DELETE",
      });
    },
  });
};
