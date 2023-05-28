/* eslint-disable prettier/prettier */
import axios from 'axios';
// import { useSelector } from "react-redux";

// eslint-disable-next-line no-undef
import {SERVER_HOST} from '@env';
export const getProfile = (controllerProfile, token) => {
  console.log(token);
  return axios.get(`${SERVER_HOST}/profile`, {
    signal: controllerProfile.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadImage = ({img}, token, controller) => {
  // console.log('image', img);
  const fromData = new FormData();
  fromData.append('image', {
    uri: img.uri,
    name: img.fileName,
    type: img.type,
    size: img.fileSize,
  });
  const url = `${SERVER_HOST}/cloud/user`;
  return axios.post(url, fromData, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const patchProfile = (body, token, controller) => {
  for (let key in body) {
    if ((typeof body[key] === 'string' && body[key] === '') || !body[key]) {
      delete body[key]; // Menghapus properti jika nilainya adalah string kosong
    }
  }
  // console.log('body', body);
  // if (body.birthday) {
  //   const datetime = body.birthday.split('T')[0]; // Memisahkan tanggal dan waktu
  //   body.birthday = datetime; // Menggunakan hanya bagian tanggal
  // }

  const url = `${SERVER_HOST}/profile`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDataUser = (file, body, token, controller) => {
  const url = `${SERVER_HOST}/auth/profile`;
  const formData = new FormData();
  if (file !== '') {
    formData.append('image', file);
  }
  Object.keys(body).forEach(key => {
    formData.set(key, body[key]);
  });
  console.log(formData);
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: {Authorization: `Bearer ${token}`},
  });
};
