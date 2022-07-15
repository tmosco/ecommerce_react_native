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

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async ({ title, imageUrl, description, price }, { getState }) => {
    const { auth } = getState();
    const userId = auth.userId;
    const token = auth.token;
    const response = await axios.post(
      `https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        title,
        imageUrl,
        description,
        price,
        userId: userId,
      }
    );

    return response.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  'getProduct',
  async (_, { getState }) => {
    const { auth } = getState();
    const userId = auth.userId;
    const response = await axios.get(
      'https://my-food-app-c854d-default-rtdb.firebaseio.com/products.json'
    );

    const loadedProducts = [];

    const data = response.data;
    for (const key in data) {
      loadedProducts.push(
        new Product(
          key,
          data[key].userId,
          data[key].title,
          data[key].imageUrl,
          data[key].description,
          data[key].price
        )
      );
    }
    const userProducts = loadedProducts.filter(
      (prod) => prod.ownerId === userId
    );

    // console.log(userProduct);
    return { loadedProducts, userProducts };
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async ({ id }, { getState }) => {
    const { auth } = getState();
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
    console.log(title);
    const { auth } = getState();
    const userId = auth.userId;
    const token = auth.token;
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
    // createProduct: (state, action) => {
    //   const newProduct = new Product(
    //     new Date().toString(),
    //     'u1',
    //     action.payload.imageUrl,
    //     action.payload.title,
    //     action.payload.description,
    //     action.payload.price
    //   );
    //   state.availableProducts.push(newProduct);
    //   state.userProducts.push(newProduct);
    // },
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
    [createProduct.pending]: (state, action) => {
      state.createStatus = 'loading';
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createStatus = 'success';
      console.log(action)
    },
    [createProduct.rejected]: (state, action) => {
      state.createStatus = 'failed';
      state.error = 'Please try again later';
      // console.log(action)
    },
    [fetchAllProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchAllProduct.fulfilled]: (state, action) => {
      state.status = 'success';
      state.availableProducts = action.payload.loadedProducts;
      state.userProducts=action.payload.userProducts
      

      // state.userProducts = action.payload.filter(prod => prod.ownerId===userId );
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
        state.userProducts[currentProduct].userId,
        action.meta.arg.title,
        action.meta.arg.imageUrl,
        action.meta.arg.description,
        state.userProducts[currentProduct].price
      );
      state.userProducts[currentProduct] = updatedProduct;
      state.availableProducts[currentProduct] = updatedProduct;
      state.createStatus = 'success';
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
