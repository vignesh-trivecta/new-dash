import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
  loggedIn: false,
};

// creating new slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
