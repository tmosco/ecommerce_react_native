import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../../data/dummy-data';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
  },
  reducers: {
    getProduct: (state) => {
      return state;
    },
    deleteProduct: (state, action) => {
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.payload
        ),
      };
    },
  },
});

export const { deleteProduct, } = productSlice.actions;

export default productSlice.reducer;
