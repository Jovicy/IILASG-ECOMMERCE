import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

export const useUnsaveProduct = () => {
  return useMutation({
    mutationFn: async (productId: string) => {
      return fetchWrapper({
        url: `/product/${productId}/unsave`,
        method: "DELETE",
      });
    },
  });
};
