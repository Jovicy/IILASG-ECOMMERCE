import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { CredentialsPayload, PartialCredentialsPayload, UserProfile } from "@/types";

export const useGetProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetchWrapper({
        url: "/user",
        method: "GET",
      });
      return res.data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation<AxiosResponse<CredentialsPayload>, Error, PartialCredentialsPayload>({
    mutationFn: (credentials: PartialCredentialsPayload) =>
      fetchWrapper({
        url: "/user",
        method: "PATCH",
        data: credentials,
      }),
  });
};
