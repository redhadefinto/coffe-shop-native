import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import welcome from '../../assets/background/bg-welcome-page.png';
import {useNavigation} from '@react-navigation/native';

const WelcomePage = () => {
  const [buttonPressedRegist, setButtonPressedRegist] = useState(false);
  const [buttonPressedLogin, setButtonPressedLogin] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={welcome} style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <Text style={styles.titleHero}>Welcome!</Text>
            <Text style={styles.descHero}>
              Get a cup of coffee for free every sunday morning
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.buttonRegist,
                buttonPressedRegist ? styles.buttonPressedRegist : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedRegist(true)}
              onPress={() => navigation.navigate('SignUp')}
              onPressOut={() => setButtonPressedRegist(false)}>
              <Text style={[styles.textButton, styles.colorBtnRegist]}>
                Create New Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonLogin,
                buttonPressedLogin ? styles.buttonPressedLogin : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedLogin(true)}
              onPress={() => navigation.navigate('Login')}
              onPressOut={() => setButtonPressedLogin(false)}>
              <Text style={[styles.textButton, styles.colorBtnLogin]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.7)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  topContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
    gap: 24,
  },
  titleHero: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 65,
  },
  descHero: {
    color: 'white',
    fontWeight: '400',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonLogin: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFBA33',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
  },
  buttonRegist: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#6A4029',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
  },
  buttonPressedLogin: {
    transform: [{scale: 0.95}],
    backgroundColor: '#FFBA55',
  },
  buttonPressedRegist: {
    transform: [{scale: 0.95}],
    backgroundColor: 'rgba(140, 70, 41, 1)',
  },
  textButton: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
  },
  colorBtnLogin: {
    color: '#6A4029',
  },
  colorBtnRegist: {
    color: '#FFFFFF',
  },
});

export default WelcomePage;
