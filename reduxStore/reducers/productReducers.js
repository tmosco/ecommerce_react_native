import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PRODUCTS from '../../data/dummy-data';
import Order from '../../models/order';
import Product from '../../models/product';
import axios from 'axios';

const initialState = {
  list: [],
  status: 'idle',
  availableProducts: [],
  userProducts: [],
  loading: false,
  error: null,
  createStatus: null,
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
    const userId = auth.userId;
    const token = auth.token;
    const response = await axios
      .post(
        `https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json?auth=${token}`,
        {
          title,
          imageUrl,
          description,
          price,
        }
      )
      .catch(function (error) {
        console.log(error);
        // if (error.response) {
        // const errorId = error.response.data.error.message;
        // let errorMessage = 'Something went wrong';
        // if (errorId === 'EMAIL_NOT_FOUND') {
        //   errorMessage = 'This email could not be found!';
        // } else if (errorId === 'INVALID_PASSWORD') {
        //   errorMessage = 'This password is not valid';
        // }
        // throw new Error(errorMessage);
        // }
      });
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
    const userId = auth.userId;
    const token = auth.token;
    await axios.delete(
      `https://my-food-app-c854d-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`
    );
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ id, title, imageUrl, description }, { getState }) => {
    const { auth } = getState();
    const userId = auth.userId;
    const token = auth.token;
    console.log(id);
    await axios.patch(
      `https://my-food-app-c854d-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        title,
        imageUrl,
        description,
      }
    );
  }
);

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

    //   updateProduct: (state, action) => {
    //     const currentProduct = state.userProducts.findIndex(
    //       (product) => product.id === action.payload.id
    //     );
    //     const updatedProduct = new Product(
    //       action.payload.id,
    //       state.userProducts[currentProduct].ownerId,
    //       action.payload.title,
    //       action.payload.imageUrl,
    //       action.payload.description,
    //       state.userProducts[currentProduct].price
    //     );

    //     const updatedUserProducts = [...state.userProducts];
    //     updatedUserProducts[currentProduct] = updatedProduct;
    //     const availableProductIndex = state.availableProducts.findIndex(
    //       (product) => product.id === action.payload.id
    //     );
    //     const updatedAvailableProduct = [...state.availableProducts];
    //     updatedAvailableProduct[availableProductIndex] = updatedProduct;

    //     return {
    //       ...state,
    //       availableProducts: updatedAvailableProduct,
    //       userProducts: updatedUserProducts,
    //     };
    //   },
  },
  extraReducers: {
    [fetchCreateProduct.pending]: (state, action) => {
      state.createStatus = 'loading';
    },
    [fetchCreateProduct.fulfilled]: (state, action) => {
      state.createStatus = 'success';
      console.log(action);
      // state.error='false'
    },
    [fetchCreateProduct.rejected]: (state, action) => {
      state.createStatus = 'failed';
      state.error = 'Please try again later';
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
    [updateProduct.pending]: (state, action) => {},
    [updateProduct.fulfilled]: (state, action) => {
      // console.log(action)
      const currentProduct = state.userProducts.findIndex(
        (product) => product.id === action.meta.arg.id
      );
      const updatedProduct = new Product(
        action.meta.arg.id,
        state.userProducts[currentProduct].ownerId,
        action.meta.arg.title,
        action.meta.arg.imageUrl,
        action.meta.arg.description,
        state.userProducts[currentProduct].price
      );
      state.userProducts[currentProduct] = updatedProduct;
      state.availableProducts[currentProduct] = updatedProduct;
      state.createStatus = 'success';
      state.error=null
    },
    [updateProduct.rejected]: (state, action) => {
      console.log('rejected');
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.userProducts = state.userProducts.filter(
        (product) => product.id !== action.meta.arg.id
      );
      state.availableProducts = state.availableProducts.filter(
        (product) => product.id !== action.meta.arg.id
      );
    },
    [deleteProduct.rejected]: (state, action) => {
      console.log('not deleted');
    },
  },
});

export default productSlice.reducer;
