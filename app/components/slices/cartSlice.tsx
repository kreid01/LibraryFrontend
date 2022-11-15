import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../assets/Interfaces";

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
    emptyCart: (state, action: PayloadAction) => {
      state.value = initialState.value;
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
    decrementFromCart: (state, action: PayloadAction<IBook>) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
  },
});

export const { addToCart, emptyCart, addBorrowToCart, decrementFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
