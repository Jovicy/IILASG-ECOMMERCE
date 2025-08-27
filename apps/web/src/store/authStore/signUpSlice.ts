import { CredentialsPayload } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CredentialsPayload = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  isLagosian: false,
  LGA: null,
  role: "",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    addSignUpCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
      return { ...state, ...action.payload };
    },

    addLGA: (state, action: PayloadAction<string>) => {
      return { ...state, LGA: action.payload };
    },

    addIsLagosian: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLagosian: action.payload };
    },
  },
});

export const { addSignUpCredentials, addIsLagosian, addLGA } = signUpSlice.actions;
export default signUpSlice.reducer;
