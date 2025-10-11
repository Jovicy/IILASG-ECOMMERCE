import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { ReviewPayload } from "@/types/product";

export const useAddReview = () => {
  return useMutation({
    mutationFn: async ({ productId, data }: { productId: string; data: ReviewPayload }) => {
      return fetchWrapper({
        url: `/product/${productId}/reviews`,
        method: "POST",
        data,
      });
    },
  });
};
