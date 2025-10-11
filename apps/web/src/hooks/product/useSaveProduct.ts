import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

export const useSaveProduct = () => {
  return useMutation({
    mutationFn: async (productId: string) => {
      return fetchWrapper({
        url: `/product/${productId}/save`,
        method: "POST",
      });
    },
  });
};
