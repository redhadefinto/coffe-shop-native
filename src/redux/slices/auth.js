/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {login} from '../../utils/https/auth';

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getAuthThunk = createAsyncThunk(
  'auth/post',
  async (body, {rejectWithValue, fulfillWithValue}) => {
    // console.log('dataaa', body);
    try {
      const response = await login(body);
      //   console.log('resss', response);
      return fulfillWithValue(response.data);
    } catch (err) {
      console.log(err.response.data);
      if (err.response.status === 401) {
        return rejectWithValue(err.response.data.msg);
      }
      //   console.log('errredux', err.response.data.msg);
      return rejectWithValue(err.response.data.msg);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    filter: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAuthThunk.pending, prevState => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getAuthThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getAuthThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.payload,
        };
      });
  },
});

export const authAction = {
  ...authSlice.actions,
  getAuthThunk,
};
export default authSlice.reducer;
