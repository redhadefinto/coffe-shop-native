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

export const getProductsDetailWithPromo = (controller, id) => {
  // const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
  // console.log(id);
  return axios.get(`${SERVER_HOST}/products/promo/${id}`, {
    signal: controller.signal,
  });
};

export const createProduct = ({data, img}, controller, token) => {
  const fromData = new FormData();
  fromData.append('image', {
    uri: img.uri,
    name: img.fileName,
    type: img.type,
    size: img.fileSize,
  });

  // Menggabungkan objek `body` dengan FormData `fromData`
  Object.entries(data).forEach(([key, value]) => {
    fromData.append(key, value);
  });
  console.log(fromData);
  return axios.post(`${SERVER_HOST}/products`, fromData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createProductWithPromo = ({data, img}, controller, token) => {
  const fromData = new FormData();
  fromData.append('image', {
    uri: img.uri,
    name: img.fileName,
    type: img.type,
    size: img.fileSize,
  });

  // Menggabungkan objek `body` dengan FormData `fromData`
  Object.entries(data).forEach(([key, value]) => {
    fromData.append(key, value);
  });
  console.log(fromData);
  return axios.post(`${SERVER_HOST}/products/promo`, fromData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProduct = ({data, img}, controller, token, id) => {
  const fromData = new FormData();
  if (data.product_name === '') {
    delete data.product_name;
  }
  if (!data.price || isNaN(data.price)) {
    delete data.price;
  }
  if (!data.category_id) {
    delete data.category_id;
  }
  if (data.desc === '') {
    delete data.desc;
  }
  if (img) {
    fromData.append('image', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
      size: img.fileSize,
    });
  }

  // Menggabungkan objek `body` dengan FormData `fromData`
  Object.entries(data).forEach(([key, value]) => {
    fromData.append(key, value);
  });
  console.log(fromData);
  return axios.patch(`${SERVER_HOST}/products/${id}`, fromData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updatePromo = ({data, img}, controller, token, id) => {
  const fromData = new FormData();
  if (img) {
    fromData.append('image', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
      size: img.fileSize,
    });
  }
  if (data.product_name === '') {
    delete data.product_name;
  }
  if (!data.price || isNaN(data.price)) {
    delete data.price;
  }
  if (!data.category_id) {
    delete data.category_id;
  }
  if (data.desc === '') {
    delete data.desc;
  }
  if (data.discount === '' || !data.discount) {
    delete data.discount;
  }
  if (!data.expired || data.expired === undefined) {
    delete data.expired;
  }
  // Menggabungkan objek `body` dengan FormData `fromData`
  Object.entries(data).forEach(([key, value]) => {
    fromData.append(key, value);
  });
  console.log(fromData);
  return axios.patch(`${SERVER_HOST}/products/promo/${id}`, fromData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
