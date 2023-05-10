/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
import axios from 'axios';
// import { json } from 'react-router-dom'
import {SERVER_HOST} from '@env';
export const getProducts = (controller, querys) => {
  console.log(querys);
  // const url = process.env.REACT_APP_SERVER_HOST;
  return axios.get(`${SERVER_HOST}/products?${querys}`, {
    signal: controller.signal,
  });
};

export const getProductsDetail = (controller, id) => {
  // const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
  // console.log(id);
  return axios.get(`${SERVER_HOST}/products/${id}`, {
    signal: controller.signal,
  });
};
