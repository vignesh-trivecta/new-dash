import { createSlice } from "@reduxjs/toolkit";

// initial state values
const initialState = {
    data: [],
}

// creating a new slice
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;