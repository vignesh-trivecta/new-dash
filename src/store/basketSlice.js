import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  selectedBasket: '',
};

// creating a new slice
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setSelectedBasket: (state, action) => {
      state.selectedBasket = action.payload;
    },
  },
});

export const { setSelectedBasket } = basketSlice.actions;

export default basketSlice.reducer;
