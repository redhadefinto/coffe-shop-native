/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  delivery: '',
  shoppingCart: [],
  // number: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (prevState, action) => {
      const exsistIdx = prevState.shoppingCart.findIndex(
        item => item.id === action.payload,
      );

      if (exsistIdx !== -1) {
        // Jika objek dg nilai id yg sama sudah ada di dalam array,
        // tambahkan nilai qty pada objek tersebut
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty + 1,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }
    },
    decrement: (prevState, action) => {
      const exsistIdx = prevState.shoppingCart.findIndex(
        item => item.id === action.payload,
      );

      if (exsistIdx !== -1) {
        // Jika objek dg nilai id yg sama sudah ada di dalam array,
        // tambahkan nilai qty pada objek tersebut
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty - 1,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }
    },
    deliveryMethod: (prevState, action) => {
      return {...prevState, delivery: action.payload};
    },
    addtoCart: (prevState, action) => {
      // console.log(action.payload);

      const exsistIdx = prevState.shoppingCart.findIndex(
        item =>
          item.id === action.payload.id && item.sizes === action.payload.sizes,
      );

      if (exsistIdx !== -1) {
        // Jika objek dg nilai id yg sama sudah ada di dalam array,
        // tambahkan nilai qty pada objek tersebut
        const existItem = prevState.shoppingCart[exsistIdx];
        const updatedItem = {
          ...existItem,
          qty: existItem.qty + action.payload.qty,
          subtotal: existItem.subtotal + action.payload.subtotal,
        };
        const updatedCart = [
          ...prevState.shoppingCart.slice(0, exsistIdx),
          updatedItem,
          ...prevState.shoppingCart.slice(exsistIdx + 1),
        ];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      } else {
        // Jika objek dg nilai id yg sama belum ada di dalam array,
        // tambahkan objek baru ke dalam array
        const updatedCart = [...prevState.shoppingCart, action.payload];
        return {
          ...prevState,
          shoppingCart: updatedCart,
        };
      }

      // return {
      //   ...prevState,
      //   shoppingCart: prevState.shoppingCart.concat(action.payload),
      // };
    },
    deleteItem: (prevState, action) => {
      const {id, sizes} = action.payload;

      const updatedCart = prevState.shoppingCart.filter(
        item => item.id !== id || item.sizes !== sizes,
      );

      return {...prevState, shoppingCart: updatedCart};
    },

    resetCart: () => {
      return initialState;
    },
  },
});

export const cartActions = {
  ...cartSlice.actions,
};
export default cartSlice.reducer;
