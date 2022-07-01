import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Order from '../../models/order';
import axios from 'axios';

const initialState = {
  status: null,
  error: '',
  isSignedIn: false,
  token: null,
  userId: null,
};

export const createUser = createAsyncThunk(
  'user/signUp',
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpbWjIxWvhquxILlNDqAjIhcI-LC6nf-8',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorId = error.response.data.error.message;
        console.log(error);
        //   let errorMessage = 'Something went wrong';
        //   if (errorId === 'EMAIL_EXIST') {
        //     errorMessage = 'This email exists already!';
        //   }
        throw new Error(error);
      }
    }

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpbWjIxWvhquxILlNDqAjIhcI-LC6nf-8',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .catch(function (error) {
        if (error.response) {
          const errorId = error.response.data.error.message;
          let errorMessage = 'Something went wrong';
          if (errorId === 'EMAIL_NOT_FOUND') {
            errorMessage = 'This email could not be found!';
          } else if (errorId === 'INVALID_PASSWORD') {
            errorMessage = 'This password is not valid';
          }
          throw new Error(errorMessage);
        }
      });

    return response.data;
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
      state.status = 'success';
    },
    [createUser.rejected]: (state, action) => {
      state.status = 'failed';
      // state.error = action;
      // console.log(action)
    },
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.isSignedIn = action.payload.registered;
      state.token = action.payload.idToken;
      state.userId= action.payload.localId;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
