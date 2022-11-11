import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../consts/Interfaces";

interface Cart {
  value: IBook[];
}

const initialState: Cart = {
  value: [] as Array<IBook>,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IBook>) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    deleteFromCart: (state, action: PayloadAction<IBook>) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
    addBorrowToCart: (state, action: PayloadAction<IBook>) => {
      console.log(action.payload);
      return {
        ...state,
        value: [
          ...state.value,
          { ...action.payload, isBorrowing: true, price: 1 },
        ],
      };
    },
  },
});

export const { addToCart, deleteFromCart, addBorrowToCart } = cartSlice.actions;

export default cartSlice.reducer;
