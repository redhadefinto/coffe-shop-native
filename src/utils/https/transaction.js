/* eslint-disable prettier/prettier */
// import { compose } from "@reduxjs/toolkit";
import axios from 'axios';
// eslint-disable-next-line no-undef
const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;

export const createTransactions = ({datas, token, controller}) => {
  const url = `${baseUrl}/transactions`;
  return axios.post(url, datas, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistory = (token, controller) => {
  // console.log(token)
  const url = `${baseUrl}/transactions`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getHistoryDetails = (token, tpsId, controller) => {
  // console.log(token)
  const url = `${baseUrl}/transactions/detail`;
  return axios.get(url, tpsId, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteHistory = (token, tpsId, controller) => {
  const url = `${baseUrl}/transactions`;
  const config = {
    headers: {Authorization: `Bearer ${token}`},
    data: {
      tpsId,
    },
    signal: controller.signal,
  };
  return axios.delete(url, config);
};
