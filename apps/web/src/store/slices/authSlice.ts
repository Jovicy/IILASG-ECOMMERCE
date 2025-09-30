import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tokenService } from "@/api/tokenService";
import { UserProfile, UserRole } from "@/types";

interface AuthState {
  role: UserRole | null;
  isAuthenticated: boolean;
  user: UserProfile | null;
}

const initialState: AuthState = {
  role: (tokenService.getRole?.() as UserRole) ?? null,
  isAuthenticated: !!tokenService.getAccessToken(),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },

    setAuth: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; role: UserRole }>) => {
      const { accessToken, refreshToken, role } = action.payload;

      tokenService.setTokens({ accessToken, refreshToken });
      tokenService.setRole(role);

      state.isAuthenticated = true;
      state.role = role;
    },
    clearAuth: (state) => {
      tokenService.setTokens({ accessToken: "", refreshToken: "" });
      tokenService.setRole(null as unknown as UserRole);

      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { setUser, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
