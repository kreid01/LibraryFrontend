import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterQuery {
  value: {
    searchQuery: string | null;
    genreQuery: string | null;
  };
}

const initialState: filterQuery = {
  value: {
    searchQuery: null,
    genreQuery: null,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    handleSearchChange: (state, action: PayloadAction<string>) => {
      state.value.searchQuery = action.payload;
    },
    handleGenreChange: (state, action: PayloadAction<string>) => {
      state.value.genreQuery = action.payload;
    },
  },
});

export const { handleSearchChange, handleGenreChange } = filterSlice.actions;

export default filterSlice.reducer;
