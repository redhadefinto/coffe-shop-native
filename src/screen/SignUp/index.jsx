import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  InputModeOptions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import bgSignUp from '../../assets/background/bg-sign-up.png';
import iconGoogle from '../../assets/icon/icon-google.png';
import {register} from '../../utils/https/auth';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [buttonPressedRegist, setButtonPressedRegist] = useState(false);
  const [buttonPressedLogin, setButtonPressedLogin] = useState(false);
  const navigation = useNavigation();
  const controller = useMemo(() => new AbortController(), []);
  const inputAccessoryViewID = 'uniqueID';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sukses, setSukses] = useState(false);
  const registerHandler = async e => {
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
    if (password === '') {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `Password require`,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50,
      );
      return;
    }
    if (phone === '') {
      setErr(true);
      ToastAndroid.showWithGravityAndOffset(
        `phone number require`,
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
      const body = {
        email,
        password,
        phone_number: phone,
      };
      const result = await register({body}, controller);
      if (result) {
        setSukses(true);
        ToastAndroid.showWithGravityAndOffset(
          `Create Account succes`,
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
      <ImageBackground source={bgSignUp} style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <Text style={styles.titleHero}>Sign Up</Text>
          </View>
          <View style={styles.bottomContainer}>
            <TextInput
              placeholder="Enter your email adress"
              style={styles.input}
              inputAccessoryViewID={inputAccessoryViewID}
              placeholderTextColor={'white'}
              onChangeText={text => {
                setErr(false);
                setEmail(text);
              }}
            />
            <TextInput
              placeholder={'Enter your password'}
              style={styles.input}
              placeholderTextColor={'white'}
              onChangeText={text => {
                setErr(false);
                setPassword(text);
              }}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Enter your phone number"
              style={styles.input}
              placeholderTextColor={'white'}
              keyboardType="numeric"
              onChangeText={text => {
                setErr(false);
                setPhone(text);
              }}
            />
            <TouchableOpacity
              style={[
                styles.buttonRegist,
                buttonPressedRegist ? styles.buttonPressedRegist : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedRegist(true)}
              onPress={sukses ? navigation.navigate('Login') : registerHandler}
              onPressOut={() => setButtonPressedRegist(false)}>
              <Text style={[styles.textButton, styles.colorBtnRegist]}>
                {loading ? (
                  <ActivityIndicator size="large" color="#FFBA33" />
                ) : sukses ? (
                  'Go To Login ?'
                ) : (
                  'Create Account'
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonGoogle,
                buttonPressedLogin ? styles.buttonPressedLogin : null,
              ]}
              activeOpacity={0.9}
              onPressIn={() => setButtonPressedLogin(true)}
              onPressOut={() => setButtonPressedLogin(false)}>
              <Image
                source={iconGoogle}
                style={styles.iconGoogle}
                width={50}
                height={50}
              />
              <Text style={[styles.textButton, styles.colorBtnLogin]}>
                Create with Google
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
    paddingHorizontal: 35,
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
  buttonGoogle: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  buttonRegist: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#6A4029',
    borderRadius: 10,
    transform: [{scale: 1}],
    transition: 'transform 0.2s',
    marginTop: 25,
    shadowColor: '#000',
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
    color: '#000000',
  },
  colorBtnRegist: {
    color: '#FFFFFF',
  },
  iconGoogle: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#FFF',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    color: '#FFF',
    fontWeight: '800',
  },
});

export default SignUp;
