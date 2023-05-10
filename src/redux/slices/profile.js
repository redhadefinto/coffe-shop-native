/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {getProfile} from '../../utils/https/profile';

const initialState = {
  data: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

const getProfileThunk = createAsyncThunk(
  'profile/get',
  async ({controllerProfile, token}) => {
    try {
      // console.log(token)
      // console.log(controllerProfile);
      const response = await getProfile(controllerProfile, token);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

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
        // console.log(action)
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
          err: action.payload,
        };
      });
  },
});

export const profileAction = {
  ...profileSlice.actions,
  getProfileThunk,
};
export default profileSlice.reducer;
