import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {NativeBaseProvider, Radio, Stack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
// import ButtonSecondary from '../../components/ButtonSecondary';
// import LoaderSpin from '../../components/LoaderSpin';
// import {getProfile} from '../../utils/https/auth';
import globalStyle from '../../styles/global';
import coffe1 from '../../assets/Products/coffe-1.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getHistory} from '../../utils/https/transaction';
import DateTimePicker from '@react-native-community/datetimepicker';
import iconCalender from '../../assets/icon/calender.png';
import iconPensil from '../../assets/icon/pensil.png';
import defaultImage from '../../assets/images/default-image.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  patchProfile,
  updateDataUser,
  uploadImage,
} from '../../utils/https/profile';
import {profileAction} from '../../redux/slices/profile';
const EditProfile = () => {
  const [Loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataImage, setDataImage] = useState();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const controllerProfile = useMemo(() => new AbortController(), []);
  useEffect(() => {}, []);
  const onChangeGender = value => {
    setGender(value);
  };
  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      // Lakukan apa pun yang perlu dilakukan dengan tanggal yang dipilih
    }
  };

  const openCamera = e => {
    e.preventDefault();
    const option = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      allowsEditing: true,
    };
    launchCamera(option, res => {
      if (res.didCancel) {
        return ToastAndroid.showWithGravityAndOffset(
          `Cancel Pick Picture`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
      if (res.errorCode) {
        return console.log(res.errorMessage);
      }
      const data = res.assets[0];
      // console.log(data);
      setDataImage(data);
    });
  };

  const openGallery = e => {
    e.preventDefault();
    const option = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
      allowsEditing: true,
    };
    launchImageLibrary(option, res => {
      if (res.didCancel) {
        return ToastAndroid.showWithGravityAndOffset(
          `Cancel Pick Picture`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50,
        );
      }
      if (res.errorCode) {
        return console.log(res.errorMessage);
      }
      const data = res.assets[0];
      // console.log(data);
      setDataImage(data);
    });
  };

  const updateProfile = async () => {
    try {
      setModalVisible(false);
      setLoading(true);
      setDataImage();
      const result = uploadImage({img: dataImage}, token, controller);
      console.log('dari result');
      console.log(result);
      if (!result) return;
      const getProfileUpdate = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token,
        }),
      );
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 403'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 401'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
    } catch (error) {
      console.log('error dari catch');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetImage = () => {
    if (dataImage) {
      return {uri: dataImage.uri};
    }
    if (profile.data[0]?.image) {
      return {uri: profile.data[0].image};
    }
    return require('../../assets/images/default-image.png');
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const body = {
        first_name: firstName,
        birthday: selectedDate,
        address,
        phone_number: phone,
        gender,
      };
      const result = await patchProfile(body, token, controller);
      if (!result) return;
      const getProfileUpdate = await dispatch(
        profileAction.getProfileThunk({
          controllerProfile,
          token,
        }),
      );
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 403'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
      if (
        getProfileUpdate.error?.message ===
        'Request failed with status code 401'
      ) {
        return setTimeout(() => {
          navigation.dispatch(StackActions.replace('LandingPage'));
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(dataImage);
  return (
    <>
      {Loading ? (
        <View style={styles.screenLoad}>
          {/* <LoaderSpin /> */}
          <ActivityIndicator size="large" color="#6A4029" />
        </View>
      ) : (
        <NativeBaseProvider>
          {profile.data?.map((data, idx) => {
            return (
              <ScrollView style={{flex: 1}} key={idx}>
                <View style={styles.screen}>
                  <View style={{position: 'relative'}}>
                    {Loading ? (
                      <ActivityIndicator size="large" color="#6A4029" />
                    ) : (
                      <Image
                        source={{uri: data.image} || defaultImage}
                        style={styles.imageProd}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.containerIconPensil}
                      onPress={() => {
                        setModalVisible(true);
                      }}>
                      <ImageBackground
                        source={iconPensil}
                        style={{width: 20, height: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginBottom: 24, width: '100%'}}>
                    <Text style={styles.textLabel}>Name :</Text>
                    <TextInput
                      style={globalStyle.inputLine}
                      value={firstName || data.first_name}
                      onChangeText={text => setFirstName(text)}
                      placeholder="Enter your name"
                      placeholderTextColor={'black'}
                    />
                  </View>

                  <Radio.Group
                    flexDirection="row"
                    value={gender || data.gender}
                    onChange={onChangeGender}
                    name="gender"
                    // accessibilityLabel="select prize"
                  >
                    <Stack direction="row" space={6} w="100%" marginBottom={6}>
                      <Radio value="male" my={1} colorScheme="warning">
                        <Text style={styles.textGender}>Male</Text>
                      </Radio>
                      <Radio value="famale" my={1} colorScheme="warning">
                        <Text style={styles.textGender}>Female</Text>
                      </Radio>
                    </Stack>
                  </Radio.Group>

                  <View style={{marginBottom: 24, width: '100%'}}>
                    <Text style={styles.textLabel}>Email :</Text>
                    <TextInput
                      style={[globalStyle.inputLine, globalStyle.email]}
                      value={data.email}
                      // onChangeText={text => setEmail(text)}
                      // placeholder="Enter your email address"
                      placeholderTextColor={'black'}
                      editable={false}
                    />
                  </View>
                  <View style={{marginBottom: 24, width: '100%'}}>
                    <Text style={styles.textLabel}>Phone Number :</Text>
                    <TextInput
                      style={globalStyle.inputLine}
                      value={phone || data.phone_number}
                      onChangeText={text => setPhone(text)}
                      placeholder="Enter your phone number"
                      keyboardType="numeric"
                      placeholderTextColor={'black'}
                    />
                  </View>
                  {/* BRITHDATE */}

                  <View style={{marginBottom: 24, width: '100%'}}>
                    <Text style={styles.textLabel}>BirthDay :</Text>
                    <TouchableOpacity
                      onPress={handleShowDatePicker}
                      style={styles.containerDate}>
                      <Text style={styles.date}>
                        {selectedDate
                          ? selectedDate.toISOString().split('T')[0]
                          : data.birthday}
                      </Text>
                      <Image
                        source={iconCalender}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                  </View>

                  <View style={{marginBottom: 24, width: '100%'}}>
                    <Text style={styles.textLabel}>Delivery Address :</Text>
                    <TextInput
                      style={globalStyle.inputLine}
                      value={address || data.address}
                      onChangeText={text => setAddress(text)}
                      placeholder="Enter your delivery address"
                      placeholderTextColor={'black'}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={handleUpdateProfile}>
                    <Text style={styles.textButtonSave}>Save</Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  visible={modalVisible}
                  transparent={true}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Image
                        source={handleSetImage()}
                        style={styles.imageModal}
                      />
                      <View>
                        <TouchableOpacity
                          style={styles.TakeGallery}
                          onPress={openGallery}>
                          <Text style={styles.textStyleBlack}>Open Galery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.TakeGallery}
                          onPress={openCamera}>
                          <Text style={styles.textStyleBlack}>Open Camera</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Pressable
                          style={[styles.buttonModal, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setDataImage();
                          }}>
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                          onPress={updateProfile}
                          style={[styles.buttonModal, styles.buttonClose]}>
                          <Text style={styles.textStyle}>Continue</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              </ScrollView>
            );
          })}
        </NativeBaseProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: 20,
  },
  imageProd: {
    width: 120,
    height: 120,
    borderRadius: 1000,
    // borderWidth: 2,
  },
  imageModal: {
    width: 120,
    height: 120,
    borderRadius: 1000,
    // borderWidth: 2,
    marginBottom: 40,
  },
  textReg: {
    fontFamily: 'Poppins-Regular',
    color: '#6A4029',
  },
  textBold: {
    fontFamily: 'Poppins-Bold',
    color: '#6A4029',
    fontSize: 20,
  },
  imgOrder: {
    width: 59,
    height: 64,
    borderRadius: 20,
  },
  textLabel: {
    fontFamily: 'Poppins-Bold',
    color: '#9F9F9F',
    fontWeight: '900',
  },
  date: {
    color: 'black',
    fontWeight: '800',
    marginTop: 10,
  },
  containerDate: {
    // borderWidth: 2,
    // width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ADADAF',
  },
  textGender: {
    fontWeight: '900',
    color: 'black',
  },
  containerIconPensil: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
    right: -30,
    position: 'absolute',
    bottom: -20,
  },
  buttonSave: {
    width: '100%',
    backgroundColor: '#6A4029',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  textButtonSave: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
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
  TakeGallery: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FFBA33',
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#6A4029',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleBlack: {
    color: '#6A4029',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Poppins-SemiBold',
    // width: 200,
    color: 'black',
    fontSize: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
});

export default EditProfile;
