/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
// import Loaders from '@/components/Loaders';
import {useNavigation} from '@react-navigation/native';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import LoadingBrown from '../../components/LoadingBrown';

const privateRoute = WrappedComponent => {
  const Auth = props => {
    const dataArray = useSelector(state => state.auth.data);
    // const router = useRouter();
    const navigate = useNavigation();
    useEffect(() => {
      if (!dataArray) {
        navigate.navigate('Login');
      }
    }, [dataArray, navigate]);

    if (dataArray) {
      return <WrappedComponent {...props} />;
    }
    return <ActivityIndicator size="large" color="#6A4029" />;
  };

  return Auth;
};

export default privateRoute;
