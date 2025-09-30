import apiClient from "./apiClient";
type FetchWrapperConfig = {
  url: string;
  method?: string;
  data?: any;
  headers?: Record<string, string>; // ✅ allow headers
};

export const fetchWrapper = async (config: FetchWrapperConfig) => {
  try {
    return apiClient({
      url: config.url,
      method: config.method || "GET",
      data: config.data,
      headers: config.headers,
    });
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Unknown error";
    throw new Error(message);
  }
};
