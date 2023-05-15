import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {View, Text, ImageBackground, Image} from 'react-native';
import styles from '../../styles/SplashScreen';
import splash from '../../assets/background/splash.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {profileAction} from '../../redux/slices/profile';
import icon from '../../assets/icon/coffeein.png';

function SplashScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth.data);
  const controllerProfile = useMemo(() => new AbortController(), []);
  const [loadingText, setLoadingText] = useState('');
  const [pageDisplayed, setPageDisplayed] = useState(false);

  const fetchProfile = async () => {
    // console.log('start');
    try {
      const result = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token,
        }),
      );
      // console.log(result);
      if (result.error?.message === 'Request failed with status code 403') {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (result.error?.message === 'Request failed with status code 401') {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (result.payload?.data) {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('DrawerNavigator'));
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('LandingPage'));
      }, 5000);
    }
  };

  useEffect(() => {
    const text = 'Coffeein';
    let currentIndex = 0;

    const interval = setInterval(() => {
      setLoadingText(prevText => {
        currentIndex++;
        if (currentIndex > text.length) {
          currentIndex = 1;
          return text.slice(0, 1);
        } else {
          return text.slice(0, currentIndex);
        }
      });
    }, 500);

    if (!pageDisplayed) {
      setPageDisplayed(true);
    } else {
      if (!token) {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      fetchProfile();
    }

    return () => {
      clearInterval(interval);
    };
  }, [navigation, token, pageDisplayed]);

  return (
    <View style={styles.container}>
      <ImageBackground source={splash} resizeMode="cover" style={styles.bg}>
        <View style={styles.overlay}>
          <View style={styles.containerIcon}>
            <Image source={icon} style={{width: 80, height: 80}} />
            <Text style={styles.mainText}>{loadingText}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SplashScreen;
