/* eslint-disable prettier/prettier */
// import { compose } from "@reduxjs/toolkit";
import axios from 'axios';
// eslint-disable-next-line no-undef
import {SERVER_HOST} from '@env';

export const createTransactions = ({datas, token, controller}) => {
  const url = `${SERVER_HOST}/transactions`;
  return axios.post(url, datas, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistory = (token, controller) => {
  // console.log(token)
  const url = `${SERVER_HOST}/transactions`;
  return axios.get(url, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getHistoryDetails = (token, tpsId, controller) => {
  // console.log(token)
  const url = `${SERVER_HOST}/transactions/detail`;
  return axios.get(url, tpsId, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteHistory = (token, tpsId, controller) => {
  const url = `${SERVER_HOST}/transactions`;
  const config = {
    headers: {Authorization: `Bearer ${token}`},
    data: {
      tpsId,
    },
    signal: controller.signal,
  };
  return axios.delete(url, config);
};
