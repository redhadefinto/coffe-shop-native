/* eslint-disable prettier/prettier */
import {combineReducers} from '@reduxjs/toolkit';

import cartSlice from './cart';
// import userSlice from './users'
import authSlice from './auth';
import profileSlice from './profile';
// import transactionsSlice from './transactions';
// import profilePatchSlice from './profilePatch'
// import profileUpdateSlice from './profileUpdate'
// import historySlice from './history';
const reducers = combineReducers({
  cart: cartSlice,
  // userPlaceHolder: userSlice,
  auth: authSlice,
  profile: profileSlice,
  // transactions: transactionsSlice,
  // history: historySlice,
});

export default reducers;
