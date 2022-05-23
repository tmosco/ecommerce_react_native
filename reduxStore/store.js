import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers'

const store = configureStore({
  reducer: {
      products: productReducer

  } //add reducers here
})

export default store;