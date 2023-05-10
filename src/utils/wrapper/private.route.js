/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
// import Loaders from '@/components/Loaders';
import {useNavigation} from '@react-navigation/native';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';

const privateRoute = WrappedComponent => {
  const Auth = props => {
    const dataArray = useSelector(state => state.auth.data);
    // const router = useRouter();
    const navigate = useNavigation();
    useEffect(() => {
      if (!dataArray) {
        // router.push('/login');
        navigate.navigate('Login');
      }
    }, [dataArray, navigate]);

    if (dataArray) {
      return <WrappedComponent {...props} />;
    }
    return <Text>Loading bg</Text>;
  };

  return Auth;
};

export default privateRoute;
