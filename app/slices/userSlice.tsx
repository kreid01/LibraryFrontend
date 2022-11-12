import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  value: {
    token: string | null;
    userId: number | null;
    isAuth?: boolean | null | undefined;
  };
}

const initialState: User = {
  value: {
    token: null,
    userId: null,
    isAuth: null,
  },
};

export type JWT = {
  token: string | null;
  userId: number | null;
  isAuth?: boolean | null | undefined;
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<JWT>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
