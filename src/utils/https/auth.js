/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import axios from 'axios';
// import { transform } from "lodash";

// const SERVER_HOST = `;
// import { get } from '../localStorage'
import {SERVER_HOST} from '@env';

export const login = body => {
  // console.log(email, password
  const url = `${SERVER_HOST}/auth`;
  return axios.post(url, body, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  });
};

export const register = ({body}, controller) => {
  console.log(body);
  const url = `${SERVER_HOST}/auth/register`;
  return axios.post(url, body, {
    signal: controller.signal,
  });
};

export const getOtp = (email, controller) => {
  const url = `${SERVER_HOST}/auth/otp`;
  return axios.patch(url, {email}, {signal: controller.signal});
};

export const forgot = ({body}, controller) => {
  const url = `${SERVER_HOST}/auth/forgot`;
  // const body = {email, otp: code_otp, password};
  // console.log(body)
  return axios.patch(url, body, {signal: controller.signal});
};

export const logOut = (token, controller) => {
  const url = `${SERVER_HOST}/auth/logout`;
  return axios.patch(
    url,
    {},
    {
      signal: controller.signal,
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const changePassword = (body, token, controller) => {
  console.log(body);
  const url = `${SERVER_HOST}/auth`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};

// export const logOut = ()
