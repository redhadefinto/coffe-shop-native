import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import ForgotImage from '../../assets/background/forgot-image.png';

const Forgot = () => {
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <Text style={styles.titleHero}>Don’t Worry!</Text>
          <Text style={styles.descHero}>
            Enter your email adress to get reset password link
          </Text>
        </View>
        <View style={styles.midleContainer}>
          <ImageBackground
            source={ForgotImage}
            style={{width: '95%', height: '95%'}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            placeholder="Enter your phone number"
            style={styles.input}
            placeholderTextColor={'#9A9A9D'}
          />
          <Text style={styles.textReceived}>Haven’t received any link?</Text>
          <TouchableOpacity
            style={[
              styles.buttonHero,
              buttonPressed ? styles.buttonPressed : null,
            ]}
            activeOpacity={0.9}
            onPressIn={() => setButtonPressed(true)}
            onPressOut={() => setButtonPressed(false)}>
            <Text style={styles.textButton}>Resend Link !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: '100%',
    minWidth: '100%',
  },
  svgImage: {
    width: 40,
    height: 40,
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  topContainer: {
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
    flex: 1,
  },
  midleContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    // borderWidth: 2,
    flex: 2,
    justifyContent: 'center',
    padding: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  titleHero: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 65,
    width: '100%',
    textAlign: 'center',
  },
  descHero: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonHero: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#6A4029',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
  },
  buttonPressed: {
    transform: [{scale: 0.95}],
    backgroundColor: '#FFBA55',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#9A9A9D',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    color: '#000',
    fontWeight: '700',
    marginBottom: 25,
  },
  textReceived: {
    color: 'black',
    marginBottom: 25,
    fontWeight: '800',
  },
});

export default Forgot;
