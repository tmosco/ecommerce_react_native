import { createSlice } from '@reduxjs/toolkit';
import Order from '../../models/order';


const orderSlice = createSlice({
  name: 'cart',
  initialState: {
    orders: [],
    item:9
  },
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
          orders: state.orders.concat(newOrder)

      }
    },
  },
});

export const { addOrder,  } = orderSlice.actions;

export default orderSlice.reducer;
