import CryptoJS from "crypto-js";

const SECRET_KEY = "67eaed519aa3ba093bf7e1b128fed49d4424a52c766a5dbdb147a8b1661360fdeaf797a7d5183281c336aa740496c6c995f881c44a1de5817a454163ebbe4e49"; // should come from .env

const encrypt = (value: string) => CryptoJS.AES.encrypt(value, SECRET_KEY).toString();

const decrypt = (value: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return null;
  }
};

export const tokenService = {
  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem("accessToken", encrypt(accessToken));
    if (refreshToken) {
      localStorage.setItem("refreshToken", encrypt(refreshToken));
    }
  },

  getAccessToken: () => {
    const token = localStorage.getItem("accessToken");
    return token ? decrypt(token) : null;
  },

  getRefreshToken: () => {
    const token = localStorage.getItem("refreshToken");
    return token ? decrypt(token) : null;
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  },

  setRole: (role: string) => {
    localStorage.setItem("role", encrypt(role));
  },

  getRole: () => {
    const role = localStorage.getItem("role");
    return role ? decrypt(role) : null;
  },
};
