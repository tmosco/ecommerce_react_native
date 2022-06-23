import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Order from '../../models/order';
import axios from 'axios';

const initialState = {
  orders: [],
  status:null,
  error:null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ cartItems, totalAmount }) => {
    const response = await axios.post(
      'https://my-food-app-c854d-default-rtdb.firebaseio.com/orders/u1.json',
      {
        cartItems,
        totalAmount,
        date: new Date().toISOString(),
      }
    );

    return response.data;
  }
);

export const fetchAllOrders = createAsyncThunk('getOrders', async () => {
  const response = await axios.get(
    
    'https://my-food-app-c854d-default-rtdb.firebaseio.com/orders/u1.json'
  );

  const loadedProducts = [];
  const data = response.data;
  for (const key in data) {
    loadedProducts.push(
      new Order(
        key,
        data[key].cartItems,
        data[key].totalAmount,
        data[key].date
      )
    );
  }


  return loadedProducts;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    addOrder: (state, action) => {
      const newOrder = new Order(
        new Date().toString(),
        action.payload.items,
        action.payload.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.status='loading'
    },
    [createOrder.fulfilled]: (state, action) => {
      const items = action.meta.arg.cartItems;
      const amount = action.meta.arg.totalAmount;
      const date = new Date().toISOString();
      const id = action.payload.name;
      const newOrder = new Order(id, items, amount, date);
      state.orders.push(newOrder);
      state.status = 'success';
    },
    [createOrder.rejected]: (state, action) => {
      state.status='failed'
    },
    [fetchAllOrders.pending]: (state, action) => {
      state.status='loading'
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      state.status = 'success';
      state.orders = action.payload;
    },
    [fetchAllOrders.rejected]: (state, action) => {
      state.error=action.error.message
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
