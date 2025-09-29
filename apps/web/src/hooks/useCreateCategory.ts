import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";

interface CategoryPayload {
  name: string;
  description?: string;
  vendorProfileId: string;
  file: File;
}

interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  vendorProfileId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const useCreateCategory = () => {
  return useMutation<AxiosResponse<CategoryResponse>, Error, CategoryPayload>({
    mutationFn: (data: CategoryPayload) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      formData.append("vendorProfileId", data.vendorProfileId);
      formData.append("file", data.file);

      console.log(data);

      return fetchWrapper({
        url: "/category",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
