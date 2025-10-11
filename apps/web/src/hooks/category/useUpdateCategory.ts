import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface UpdateCategoryPayload {
  id: string;
  name?: string;
  description?: string;
}

export const useUpdateCategory = () => {
  return useMutation<AxiosResponse<any>, Error, UpdateCategoryPayload>({
    mutationFn: async (payload) =>
      fetchWrapper({
        url: `/category/${payload.id}`,
        method: "PATCH",
        data: {
          name: payload.name,
          description: payload.description,
        },
      }),
  });
};
