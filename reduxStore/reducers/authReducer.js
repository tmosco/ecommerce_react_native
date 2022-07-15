import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Order from '../../models/order';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const initialState = {
  status: null,
  error: '',
  authenticated: false,
  token: null,
  userId: null,
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const authenticate = createAsyncThunk('', async () => {
  const userData = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(userData);

  return transformedData;
});

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
      return response.data;
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

export const logoutUser = () => {
  AsyncStorage.removeItem('userData');
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      logoutUser();
      return {
        initialState,
      };
    },
  },

  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createUser.fulfilled]: (state, action) => {
      state.status = 'success';
      const token = action.payload.idToken;
      const id = action.payload.localId;
      state.token = token;
      state.userId = id;
      // state.authenticated=true

      const expirationDate = new Date(
        new Date().getTime() + parseInt(action.payload.expiresIn) * 1000
      );

      saveDataToStorage(token, id, expirationDate);
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
      state.authenticated = action.payload.registered;
      const token = action.payload.idToken;
      const id = action.payload.localId;
      state.token = token;
      state.userId = id;
    
      const expirationDate = new Date(
        new Date().getTime() + parseInt(action.payload.expiresIn) * 1000
      );

      saveDataToStorage(token, id, expirationDate);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [logoutUser.fulfilled]: (state, action) => {
      console.log(action);
      console.log('action');
      initialState;
    },
    [authenticate.fulfilled]: (state, action) => {
      const token = action.payload.token;
      const userId = action.payload.userId;
      const expireDate = action.payload.expiryDate;
      if (expireDate <= new Date() || !token || !userId) {
        state.authenticated = false;
      }
      state.authenticated = true;
      state.token = token;
      state.userId = userId;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
