import { fetchWrapper } from "@/api/fetchWrapper";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface CreateCategoryPayload {
  name: string;
  description?: string;
  image?: File;
}

interface CategoryResponse {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export const useCreateCategory = (): UseMutationResult<AxiosResponse<CategoryResponse>, Error, CreateCategoryPayload> => {
  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      if (payload.description) formData.append("description", payload.description);
      if (payload.image) formData.append("image", payload.image);

      return fetchWrapper({
        url: "/category",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  });
};
