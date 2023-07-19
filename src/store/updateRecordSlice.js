import { createSlice } from '@reduxjs/toolkit';

// initial state values
const initialState = {
    selectedStock: '',
    instrumentName: "",
    exchange: "",
    orderType: "",
    weightage: "",
    quantity: "",
    price: "",
};

// creating a new slice
const updateRecordSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setInstrumentName: (state, action) => {
      state.instrumentName = action.payload;
    },
    setExchange: (state, action) => {
      state.exchange = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setWeightage: (state, action) => {
      state.weightage = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setSelectedStock, setInstrumentName, setExchange, setOrderType, setWeightage, setQuantity, setPrice } = updateRecordSlice.actions;

export default updateRecordSlice.reducer;
