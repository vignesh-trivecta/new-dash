import { createSlice } from "@reduxjs/toolkit";

// initial state values
const initialState = {
    tab: 'basket',
}

// creating new slice
const evnetSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.tab = action.payload;
        },
    }
});

export const { setTab } = evnetSlice.actions;

export default evnetSlice.reducer;