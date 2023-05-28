import React, {useState, useMemo} from 'react';
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
  Modal,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import ForgotImage from '../../assets/background/forgot-image.png';
import {forgot, getOtp} from '../../utils/https/auth';
import {useNavigation} from '@react-navigation/native';
const Forgot = () => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const controller = useMemo(() => new AbortController(), []);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);
  const navigate = useNavigation();
  const handlerForgot = async e => {
    e.preventDefault();
    setErr(false);
    if (otp === '') {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `otp require`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }
    if (password === '') {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `password number require`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }
    try {
      setLoading(true);
      const body = {
        email,
        otp,
        password,
      };
      const result = await forgot({body}, controller);
      if (result) {
        setSucces(true);
        ToastAndroid.showWithGravityAndOffset(
          `Succes Update Password`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
    } catch (error) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handlerCode = async e => {
    e.preventDefault();
    setErr(false);
    if (email === '') {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `Email require`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `Email Not valid`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }
    try {
      setLoading(true);
      const result = await getOtp(email, controller);
      if (result) {
        setIsCode(true);
        ToastAndroid.showWithGravityAndOffset(
          `Please cek your Email`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
            placeholder="Enter your Email"
            style={styles.input}
            placeholderTextColor={'#9A9A9D'}
            value={email}
            onChangeText={text => {
              setErr(false);
              setEmail(text);
            }}
          />
          <Text style={styles.textReceived}>Haven’t received any link?</Text>
          {isCode ? (
            <TouchableOpacity
              style={[
                styles.buttonHero,
                buttonPressed ? styles.buttonPressed : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressed(true)}
              onPress={() => setModalVisible(true)}
              onPressOut={() => setButtonPressed(false)}>
              <Text style={styles.textButton}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FFBA33" />
                ) : (
                  'Change Password'
                )}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.buttonHero,
                buttonPressed ? styles.buttonPressed : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressed(true)}
              onPress={handlerCode}
              onPressOut={() => setButtonPressed(false)}>
              <Text style={styles.textButton}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FFBA33" />
                ) : (
                  'Resend Link !'
                )}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <TextInput
                placeholder="Enter your Email"
                style={styles.inputDark}
                placeholderTextColor={'black'}
                value={email}
                editable={false}
              />
              <TextInput
                placeholder="Enter your Otp number"
                style={styles.inputDark}
                placeholderTextColor={'black'}
                keyboardType="numeric"
                onChangeText={text => {
                  setErr(false);
                  setOtp(text);
                }}
                value={otp}
              />
              <TextInput
                placeholder="Enter your Password"
                style={styles.inputDark}
                placeholderTextColor={'black'}
                secureTextEntry={true}
                onChangeText={text => {
                  setErr(false);
                  setPassword(text);
                }}
                value={password}
              />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {succes ? (
                <TouchableOpacity
                  style={[styles.buttonModal, styles.buttonClose]}
                  onPress={() => navigate.navigate('Login')}>
                  <Text style={styles.textStyle}>GO To Login</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => setModalVisible(!Modal)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlerForgot}
                    style={[styles.buttonModal, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Continue</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
  },
  inputDark: {
    height: 40,
    width: 200,
    borderColor: '#000',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    width: 100,
    marginHorizontal: 15,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  modalText: {
    fontFamily: 'Poppins-SemiBold',
    // width: 200,
    color: 'black',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Forgot;
