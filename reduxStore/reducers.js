import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../data/dummy-data';



const productSlice = createSlice({
    name:'Product',
    initialState: {
        availableProducts:PRODUCTS,
        userProducts:PRODUCTS.filter(prod => prod.ownerId === 'u1')

        
      },
      reducers: {
          getProduct:(state) =>{
              return state
          }

      }

})

export default productSlice.reducer;