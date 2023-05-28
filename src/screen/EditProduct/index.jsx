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
import React, {useEffect, useMemo, useState, Fragment} from 'react';
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
import defaultImage from '../../assets/Products/default-product.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  patchProfile,
  updateDataUser,
  uploadImage,
} from '../../utils/https/profile';
import {PermissionsAndroid} from 'react-native';
import {profileAction} from '../../redux/slices/profile';
import {
  createProduct,
  getProductsDetail,
  updateProduct,
} from '../../utils/https/products';
import {StackActions, useRoute} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

const EditProduct = () => {
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dataImage, setDataImage] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const dispatch = useDispatch();
  const router = useRoute();
  const id = router.params.prodId;
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  const {token} = useSelector(state => state.auth.data);
  const controller = useMemo(() => new AbortController(), []);
  const [datas, setDatas] = useState([]);

  const openCamera = async e => {
    e.preventDefault();
    try {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkGranted) {
        console.log('Camera permission is granted.');
      } else {
        console.log('Camera permission is not granted.');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted.');
          // You can now access the camera.
        } else {
          console.log('Camera permission denied.');
          // Handle permission denied case.
        }
      }
    } catch (error) {
      console.log('Error checking camera permission:', error);
    }
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

  const openGallery = async e => {
    e.preventDefault();
    try {
      const checkGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkGranted) {
        console.log('Camera permission is granted.');
      } else {
        console.log('Camera permission is not granted.');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted.');
          // You can now access the camera.
        } else {
          console.log('Camera permission denied.');
          // Handle permission denied case.
        }
      }
    } catch (error) {
      console.log('Error checking camera permission:', error);
    }
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

  const handleSetImage = () => {
    if (dataImage) {
      return {uri: dataImage.uri};
    }
    if (datas.length !== 0) {
      return {uri: datas[0].image};
    }
    return require('../../assets/Products/default-product.png');
  };
  const onChangeCategory = value => {
    setCategory(value);
  };

  useEffect(() => {
    setLoading(true);
    getProductsDetail(controller, id)
      .then(({data}) => {
        setDatas(data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
      setLoading(true);
      const data = {
        product_name: name,
        price: parseInt(price),
        category_id: category,
        desc: Description,
      };
      const result = await updateProduct(
        {data, img: dataImage},
        controller,
        token,
        id,
      );
      console.log(result);
      if (result) {
        showMessage({
          message: 'Edit Product Succes',
          type: 'success',
        });
        setTimeout(() => {
          navigation.replace('DrawerNavigator');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: error.response.data.msg,
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };
  // console.log(datas);
  return (
    <>
      <NativeBaseProvider>
        <FlashMessage position="top" />
        <ScrollView style={{flex: 1}}>
          <View style={styles.screen}>
            {Loading ? (
              <View
                style={{
                  width: '100%',
                  height: 700,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#6A4029" />
              </View>
            ) : (
              datas.map((data, idx) => {
                return (
                  <Fragment key={idx}>
                    <View style={{position: 'relative'}}>
                      <Image
                        source={handleSetImage()}
                        style={styles.imageProd}
                      />
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
                        value={name || data.product_name}
                        onChangeText={text => setName(text)}
                        placeholder="Input the product name"
                        // placeholderTextColor={'black'}
                      />
                    </View>

                    <View style={{marginBottom: 24, width: '100%'}}>
                      <Text style={styles.textLabel}>Price :</Text>
                      <TextInput
                        style={[globalStyle.inputLine]}
                        value={price ? price.toString() : data.price.toString()}
                        onChangeText={text => setPrice(text)}
                        keyboardType="numeric"
                        placeholder="Input the product price"
                        // placeholderTextColor={'black'}
                      />
                    </View>

                    <Radio.Group
                      value={category || data.categories_id}
                      onChange={onChangeCategory}
                      name="category"
                      // accessibilityLabel="select prize"
                    >
                      <Text style={styles.textLabel}>Category :</Text>
                      <Stack
                        direction="row"
                        space={2}
                        w="100%"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        marginTop={2}
                        marginBottom={6}>
                        <Radio value={1} my={1} colorScheme="warning">
                          Coffee
                        </Radio>
                        <Radio value={2} my={1} colorScheme="warning">
                          Non Coffee
                        </Radio>
                        <Radio value={3} my={1} colorScheme="warning">
                          Foods
                        </Radio>
                      </Stack>
                    </Radio.Group>

                    <View style={{marginBottom: 24, width: '100%'}}>
                      <Text style={styles.textLabel}>Description :</Text>
                      <TextInput
                        style={globalStyle.inputLine}
                        value={Description || data.desc}
                        onChangeText={text => setDescription(text)}
                        placeholder="Enter your delivery Description"
                        multiline
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.buttonSave}
                      onPress={handleUpdateProduct}>
                      <Text style={styles.textButtonSave}>Save</Text>
                    </TouchableOpacity>
                  </Fragment>
                );
              })
            )}
          </View>
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image source={handleSetImage()} style={styles.imageModal} />
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
                  <TouchableOpacity
                    style={[styles.buttonModal, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setDataImage();
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={[styles.buttonModal, styles.buttonClose]}>
                    <Text style={styles.textStyle}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </NativeBaseProvider>
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
    borderRadius: 30,
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
  textLabel: {
    fontFamily: 'Poppins-Bold',
    color: '#9F9F9F',
    fontWeight: '900',
  },
});

export default EditProduct;
