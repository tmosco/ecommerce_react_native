import { createSlice } from '@reduxjs/toolkit';
import CartItem from '../../models/cart-item';
import { addOrder, createOrder } from './orderReducer';
import { deleteProduct } from './productReducers';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {},
    totalAmount: 0,
    numOfItem: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
          numOfItem: state.numOfItem + 1,
        };
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: newCartItem,
          },
          totalAmount: state.totalAmount + prodPrice,
          numOfItem: state.numOfItem + 1,
        };
      }
    },

    removeFromCart: (state, action) => {
      const removedProduct = action.payload;
      const currentQty = state.items[removedProduct.productId].quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          state.items[removedProduct.productId].quantity - 1,
          removedProduct.productPrice,
          removedProduct.productTitle,
          state.items[removedProduct.productId].sum -
            removedProduct.productPrice
        );
        updatedCartItems = {
          ...state.items,
          [removedProduct.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[removedProduct.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - removedProduct.productPrice,
        numOfItem: state.numOfItem - 1,
      };
    },
    clearCart: (state, action) => {
      return {
        ...state,
        items: {},
        totalAmount: 0,
        numOfItem: 0,
      };
    },
  },
  extraReducers: (builders) => {
    // builders.addCase(createOrder, (state, action) => {
    //   return {
    //     items: {},
    //     totalAmount: 0,
    //     numOfItem: 0,
    //   };
    // }),
    builders.addCase(deleteProduct, (state, action) => {
      if (!state.items[action.payload]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.payload].sum;
      const itemQuantity = state.items[action.payload].quantity;
      delete updatedItems[action.payload];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
        numOfItem: state.numOfItem - itemQuantity,
      };
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
