import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { fetchWrapper } from "@/api/fetchWrapper";
import { CredentialsPayload, PartialCredentialsPayload } from "@/types";

export const useUpdate = () => {
  return useMutation<AxiosResponse<CredentialsPayload>, Error, PartialCredentialsPayload>({
    mutationFn: (credentials: PartialCredentialsPayload) =>
      fetchWrapper({
        url: "/user",
        method: "PATCH",
        data: credentials,
      }),
  });
};
