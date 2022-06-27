import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Order from '../../models/order';
import axios from 'axios';

const initialState = {
    status:null
};

export const createUser = createAsyncThunk(
  'user/signUp',
  async ({ email, password }) => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpbWjIxWvhquxILlNDqAjIhcI-LC6nf-8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );

    // return response.data;
    console.log(response.data);
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpbWjIxWvhquxILlNDqAjIhcI-LC6nf-8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );

    // return response.data;
    console.log(response.data);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createUser.fulfilled]: (state, action) => {
      console.log(action);
    },
    [createUser.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log('success');
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default authSlice.reducer;
