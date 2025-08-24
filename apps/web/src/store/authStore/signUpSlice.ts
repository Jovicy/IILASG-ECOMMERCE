import { Credentials } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Credentials = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  isLagosian: false,
  state: "",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    addSignUpCredentials: (state, action: PayloadAction<Credentials>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addSignUpCredentials } = signUpSlice.actions;
export default signUpSlice.reducer;
