import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";
import basketSlice from "./basketSlice";
import eventSlice from "./eventSlice";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';

// combinig all the slices to a reducer
const reducers = combineReducers({
    auth: authSlice,
    user: userSlice,
    data: dataSlice,
    basket: basketSlice,
    event: eventSlice,
});

// configuration for persiting data
const persistConfig = {
    key: 'root',
    whitelist: ['auth', 'data', 'basket', 'event'],
    storage,
}

// creating persist reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// declaring store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

export const persistor = persistStore(store)

export default store;
