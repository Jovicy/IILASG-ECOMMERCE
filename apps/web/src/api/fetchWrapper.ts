import apiClient from "./apiClient";

export const fetchWrapper = async ({ url, method = "GET", data }) => {
  try {
    const res = await apiClient({ url, method, data });
    return res;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Unknown error";
    throw new Error(message);
  }
};
