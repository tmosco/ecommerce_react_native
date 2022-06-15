import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PRODUCTS from '../../data/dummy-data';
import Order from '../../models/order';
import Product from '../../models/product';
import axios from 'axios';

const initialState = {
  list: [],
  status: null,
  availableProducts: [],
  userProducts: [],
  loading: false,
  error: null,
};

// export const getPosts = createAsyncThunk('getPosts', async () => {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/posts'
//   );

//   return response;
// });

export const fetchCreateProduct = createAsyncThunk(
  'product/createProduct',
  async ({ title, imageUrl, description, price }) => {
    const response = await axios.post(
      'https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json',
      {
        title,
        imageUrl,
        description,
        price,
      }
    );
    // const resData = response.json();
    return response.data;
  }
);

export const fetchAllProduct = createAsyncThunk('getProduct', async () => {
  const response = await axios.get(
    'https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json'
  );
  const loadedProducts = [];
  const data = response.data;
  for (const key in data) {
    loadedProducts.push(
      new Product(
        key,
        'ui',
        data[key].title,
        data[key].imageUrl,
        data[key].description,
        data[key].price
      )
    );
  }

  return loadedProducts;
});

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async ({ id }) => {
    const response = await axios.delete(
      'https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json',
      {}
    );
  }
);

// export const updateProduct = createAsyncThunk(
//   'updateProduct',
//   async ({ title, imageUrl, description}) => {
//    await axios.patch(
//       `https://my-food-app-c854d-default-rtdb.firebaseio.com/products${id}.json`,
//       {
//         title,
//         imageUrl,
//         description,
//       }
//     );

//   }
// );

const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    createProduct: (state, action) => {
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.imageUrl,
        action.payload.title,
        action.payload.description,
        action.payload.price
      );
      state.availableProducts.push(newProduct);
      state.userProducts.push(newProduct);
    },
    // deleteProduct: (state, action) => {
    //   return {
    //     ...state,
    //     userProducts: state.userProducts.filter(
    //       (product) => product.id !== action.payload
    //     ),
    //     availableProducts: state.availableProducts.filter(
    //       (product) => product.id !== action.payload
    //     ),
    //   };
    // },

    updateProduct: (state, action) => {
      const currentProduct = state.userProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[currentProduct].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[currentProduct].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[currentProduct] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      const updatedAvailableProduct = [...state.availableProducts];
      updatedAvailableProduct[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProduct,
        userProducts: updatedUserProducts,
      };
    },
  },
  extraReducers: {
    [fetchCreateProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchCreateProduct.fulfilled]: (state, { payload, meta }) => {
      const newProduct = new Product(
        payload.name,
        'u1',
        meta.arg.imageUrl,
        meta.arg.title,
        meta.arg.description,
        meta.arg.price
      );
      state.availableProducts.push(newProduct);
    
    },
    [fetchCreateProduct.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [fetchAllProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllProduct.fulfilled]: (state, action) => {
      state.status = 'success';
      state.availableProducts = action.payload;
      state.userProducts = action.payload;
    },
    [fetchAllProduct.rejected]: (state, action) => {
      state.status = 'failed';
    },
  // [updateProduct.pending]:(state,action) =>{
    
  // },
  // [updateProduct.fulfilled]:(state,action) =>{
  //   // state.availableProducts = action.availableProducts

  // },
  // [updateProduct.rejected]:(state,action) =>{

  // }
  },
});

export const {updateProduct, createProduct } = productSlice.actions;

export default productSlice.reducer;
