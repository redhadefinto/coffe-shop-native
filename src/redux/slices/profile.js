/* eslint-disable prettier/prettier */
// profileSlice.js

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProfile} from '../../utils/https/profile';

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

// Membuat async thunk untuk memanggil API getProfile
export const getProfileThunk = createAsyncThunk(
  'profile/get',
  async ({controllerProfile, token}) => {
    try {
      const response = await getProfile(controllerProfile, token);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

// Membuat slice reducer dan menambahkan ekstra reducers
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    filter: prevState => {
      return {
        ...prevState,
        data: [],
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileThunk.pending, prevState => {
        return {
          ...prevState,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
          err: null,
        };
      })
      .addCase(getProfileThunk.fulfilled, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isFulfilled: true,
          data: action.payload,
        };
      })
      .addCase(getProfileThunk.rejected, (prevState, action) => {
        return {
          ...prevState,
          isLoading: false,
          isRejected: true,
          err: action.error.message, // Menggunakan pesan kesalahan yang dapat diserialisasi
        };
      });
  },
});

export const profileAction = {
  ...profileSlice.actions,
  getProfileThunk,
};

export default profileSlice.reducer;
