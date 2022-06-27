import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/productReducers'
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
      products: productReducer,
      cart:cartReducer,
      orders:orderReducer,
      auth:authReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  }) //add reducers here
})

export default store;