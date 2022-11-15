import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../components/slices/filterSlice";
import cartReducer from "../components/slices/cartSlice";
import userReducer from "../components/slices/userSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
