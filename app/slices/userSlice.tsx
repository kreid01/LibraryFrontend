import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../consts/Interfaces";

interface User {
  value: IUser;
}

const initialState: User = {
  value: {
    token: null,
    userId: null,
    isAuth: null,
  },
};

type IUser = {
  token: string | null;
  userId: number | null;
  isAuth: boolean | null;
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
