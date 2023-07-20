import { createSlice } from "@reduxjs/toolkit";

// initial state values
const initialState = {
    user: '',
    email: '',
    phone: ''
}

// creating new slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        }
    }
});

export const { setUser, setEmail, setPhone } = userSlice.actions;

export default userSlice.reducer;