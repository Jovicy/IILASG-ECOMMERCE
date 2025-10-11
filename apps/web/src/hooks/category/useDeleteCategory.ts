import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (id: string) =>
      fetchWrapper({
        url: `/category/${id}`,
        method: "DELETE",
      }),
  });
};
