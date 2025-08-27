import { Credentials } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { add } from "date-fns";

const initialState: Credentials = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  isLagosian: false,
  LGA: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    addSignUpCredentials: (state, action: PayloadAction<Credentials>) => {
      return { ...state, ...action.payload };
    },

    addLGA: (state, action: PayloadAction<string>) => {
      return { ...state, LGA: action.payload };
    },

    addIsLagosian: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLagosian: action.payload };
    },

    addAccountType: (state, action: PayloadAction<string>) => {
      return { ...state, accountType: action.payload };
    },
  },
});

export const { addSignUpCredentials, addIsLagosian, addLGA, addAccountType } = signUpSlice.actions;
export default signUpSlice.reducer;
